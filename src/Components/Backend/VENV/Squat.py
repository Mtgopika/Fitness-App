import cv2
import numpy as np
import time
import PoseModule as pm  # Assuming you have a custom PoseModule for pose detection

# Initialize video capture
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Unable to open video file.")
    exit()

# Initialize pose detector
detector = pm.poseDetector()

# Initialize variables
count = 0
dir = 0
pTime = 0

# Resize image function
def resize_with_aspect_ratio(image, width):
    aspect_ratio = image.shape[1] / float(image.shape[0])
    height = int(width / aspect_ratio)
    resized_image = cv2.resize(image, (width, height))
    return resized_image

# Main loop
while True:
    # Read frame from video capture
    success, img = cap.read()
    if not success or img is None:  # Check if img is empty
        break

    # Resize image while maintaining aspect ratio
    img = resize_with_aspect_ratio(img, 1880)

    # Find pose in the resized image
    img = detector.findPose(img, False)
    lmList = detector.findPosition(img, False)

    # Calculate angle for squat detection
    if len(lmList) != 0:
        #right 
        angle = detector.findAngle(img, 24, 26, 28)
        

         #left
        angle = detector.findAngle(img, 23, 25, 27)
        per = np.interp(angle, (200, 310), (0, 100))
        bar = np.interp(angle, (200, 310), (650, 100))

        # Check for squat movement
        color = (255, 0, 255)
        if per >= 90:
            color = (0, 255, 0)
            if dir == 0:
                count += 0.5
                dir = 1
        if per <= 10:
            color = (0, 255, 0)
            if dir == 1:
                count += 0.5
                dir = 0

        # Draw feedback on the image
        cv2.rectangle(img, (1100, 100), (1175, 650), color, 3)
        cv2.rectangle(img, (1100, int(bar)), (1175, 650), color, cv2.FILLED)
        cv2.putText(img, f'{int(per)} %', (1100, 75), cv2.FONT_HERSHEY_PLAIN, 4, color, 4)

        # Draw squat count
        cv2.rectangle(img, (0, 450), (250, 720), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (45, 670), cv2.FONT_HERSHEY_PLAIN, 15, (255, 0, 0), 25)

    # Calculate and display FPS
    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5, (255, 0, 0), 5)

    # Show the image
    cv2.imshow("Squat Detection", img)

    # Check for exit key press
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()

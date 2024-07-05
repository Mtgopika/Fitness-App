import cv2
import numpy as np
import time
import PoseModule as pm  # Assuming you have a custom PoseModule for pose detection

# Initialize video capture
cap = cv2.VideoCapture(0)

# Initialize pose detector
detector = pm.poseDetector()

# Initialize variables
count = 0
dir = 0
pTime = 0
reps = 0
prev_state = 0

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
    img = resize_with_aspect_ratio(img, 1480)

    # Find pose in the resized image
    img = detector.findPose(img, False)
    lmList = detector.findPosition(img, False)

    # Calculate angle for push-up detection
    if len(lmList) != 0:
        # Check the angle of the arms for push-up detection
        angle = detector.findAngle(img, 12, 24, 26)
        print(angle);
       


        # Map the angle to a percentage (0-100)
        per = np.interp(angle, (171, 265), (0, 100))
        bar = np.interp(angle, (171, 265), (650, 100))

        # Check for the dumbbell curls
        color = (255, 0, 255)
        if per == 100:
            color = (0, 255, 0)
            if dir == 0:
                count += 0.5
                dir = 1
        if per == 0:
            color = (0, 255, 0)
            if dir == 1:
                count += 0.5
                dir = 0
        print(count)

        # Draw Bar
        cv2.rectangle(img, (1100, 100), (1175, 650), color, 3)
        cv2.rectangle(img, (1100, int(bar)), (1175, 650), color, cv2.FILLED)
        cv2.putText(img, f'{int(per)} %', (1100, 75), cv2.FONT_HERSHEY_PLAIN, 4,
                    color, 4)

        # Draw Curl Count
        cv2.rectangle(img, (0, 450), (250, 720), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (45, 670), cv2.FONT_HERSHEY_PLAIN, 15,
                    (255, 0, 0), 25)

    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5,
                (255, 0, 0), 5)

    cv2.imshow("Image", img)


     
    
    # Wait for a key press event
    key = cv2.waitKey(1) & 0xFF

    # Check if the 'q' key is pressed to quit the loop
    if key == ord('q'):
        break

# Release the video capture object and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
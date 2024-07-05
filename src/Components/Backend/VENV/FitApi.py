from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load fitness data
fit_data = pd.read_csv('FitnessData.csv')
df = pd.DataFrame(fit_data)

# Preprocess data
df['Index'] = df['Index'].astype(float)
df['Gender'] = df['Gender'].astype('category').cat.codes
df['Body_Part'] = df['Body_Part'].astype('category').cat.codes

# Train the KNN model
X = df[['Gender', 'Index', 'Body_Part']]
knn = NearestNeighbors(n_neighbors=5, algorithm='ball_tree').fit(X)

# Define workout mapping
workout_mapping = {
    'Jumping Jacks': 'Jumping Jacks',
    'Squats': 'Squats',
    'Bicep curls': 'Bicep curls',
    'Lunges': 'Lunges',
    'push up': 'push up',
    'Bench press': 'Bench Press',
    'Leg Curls': 'Leg Curls',
    'Plank': 'Plank',
    'Butterfly stretch': 'Butterfly stretch',
    'Cobra stretch': 'Cobra stretch',
    'Abdominal crunch': 'Abdominal crunch',
    'Pull ups': 'Pull ups',
    'step ups': 'step ups',
    'Leg raises': 'Leg raises'
}

@app.route('/recommend', methods=['POST'])
def recommend_workouts():
    data = request.get_json()
    gender = int(data['Gender'])
    index = float(data['Index'])
    body_part = int(data['Body_Part'])

    user_input = np.array([[gender, index, body_part]])
    distances, indices = knn.kneighbors(user_input)

    recommended_workouts = set()
    for index in indices[0]:
        workout = df.iloc[index]['Exercise']
        recommended_workouts.add(workout_mapping.get(workout, 'Unknown'))
    recommended_workouts = list(recommended_workouts)  # Convert set back to list

    

    return jsonify({
        'recommended_workouts': recommended_workouts,
        
    })

@app.route('/save_model', methods=['GET'])
def save_model():
    with open('model.pkl', 'wb') as f:
        pickle.dump(knn, f)
    return 'Model saved successfully'

if __name__ == '__main__':
    app.run(debug=True)

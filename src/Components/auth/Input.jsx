import React, { useState } from 'react';
import axios from 'axios';
import './Input.css';
import { Link } from 'react-router-dom';

function Input() {
    const [gender, setGender] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [bmiIndex, setBmiIndex] = useState('');
    const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/recommend', {
                Gender: gender,
                Index: bmiIndex,
                Body_Part: bodyPart
            });
            setRecommendedWorkouts(response.data.recommended_workouts);
            setError(null);
        } catch (error) {
            setError('An error occurred while fetching data.');
            console.error('Error occurred:', error);
        }
        setLoading(false);
    };

    return (
        <div className='background-image'>
        <div className="container">
            <div className="input-container">
                <h1>Your Details</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Gender:
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="0">Female</option>
                                <option value="1">Male</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Body Part:
                            <select value={bodyPart} onChange={(e) => setBodyPart(e.target.value)}>
                                <option value="">Select Body Part</option>
                                <option value="1">Arm</option>
                                <option value="3">Leg</option>
                                <option value="4">Chest</option>
                                <option value="2">Core</option>
                                <option value="0">Abs</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            BMI Index:
                            <select value={bmiIndex} onChange={(e) => setBmiIndex(e.target.value)}>
                                <option value="">Select BMI Index</option>
                                <option value="0">Extreme Underweight</option>
                                <option value="1">Underweight</option>
                                <option value="2">Normal</option>
                                <option value="3">Overweight</option>
                                <option value="4">Obese</option>
                                <option value="5">Extremely Obese</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
            <div className="recommended-container">
                {recommendedWorkouts.length > 0 && (
                    <div>
                        <h2>Your Workouts</h2>
                        <ul>
                            {recommendedWorkouts.map((workout, index) => (
                                <li key={index}>
                                    <Link to={`/exercise/${workout.replace(/\s+/g, '-')}`}>{workout}</Link>

                                    </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default Input;

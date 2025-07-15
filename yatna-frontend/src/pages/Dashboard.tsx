import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [title, setTitle] = useState('');

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchWorkouts = async () => {
    try {
      const res = await api.get('/workouts');
      setWorkouts(res.data);
    } catch (err) {
      console.error('Error fetching workouts', err);
    }
  };

  const addWorkout = async () => {
    if (!title.trim()) return;
    try {
      await api.post('/workouts', { title });
      setTitle('');
      fetchWorkouts();
    } catch (err) {
      console.error('Error adding workout', err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🏋️ Workouts</h2>
      <input
        type="text"
        placeholder="Enter workout title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addWorkout}>Add Workout</button>

      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.title} — {new Date(workout.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

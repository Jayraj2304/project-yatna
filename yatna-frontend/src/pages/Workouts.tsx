import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Workout = {
  id: number;
  title: string;
  date: string;
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]); // ✅ this was missing
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
      console.error('Error fetching workouts:', err);
    }
  };

  const addWorkout = async () => {
    if (!title.trim()) return;
    try {
      await api.post('/workouts', { title });
      setTitle('');
      fetchWorkouts();
    } catch (err) {
      console.error('Error adding workout:', err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🏋️ My Workouts</h2>

      <div>
        <input
          type="text"
          placeholder="Workout title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </div>

      <ul>
        {workouts.map((w) => (
          <li key={w.id}>
            <strong>{w.title}</strong> — {new Date(w.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;

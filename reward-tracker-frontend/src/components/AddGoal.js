import React, { useState } from 'react';
import axios from 'axios';

const AddGoal = ({ onGoalAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [milestones, setMilestones] = useState('');
  const [reward, setReward] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description || !milestones || !reward) {
      setError('Please fill in all fields.');
      return;
    }

    const milestonesArray = milestones.split(',').map(m => m.trim());

    axios.post('/api/goals', { title, description, milestones: milestonesArray, reward })
      .then((res) => {
        onGoalAdded(res.data);
        setTitle('');
        setDescription('');
        setMilestones('');
        setReward('');
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to add goal.');
      });
  };

  return (
    <div>
      <h2>Add a New Goal</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Milestones (comma-separated):</label>
          <input type="text" value={milestones} onChange={(e) => setMilestones(e.target.value)} />
        </div>
        <div>
          <label>Reward:</label>
          <input type="text" value={reward} onChange={(e) => setReward(e.target.value)} />
        </div>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default AddGoal;

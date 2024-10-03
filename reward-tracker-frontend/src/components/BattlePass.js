import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddGoal from './AddGoal';  // Import the AddGoal component

const BattlePass = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [tierUnlocked, setTierUnlocked] = useState(false);

  useEffect(() => {
    // Fetch user info and goals when the component mounts
    axios.get(`/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));

    axios.get('/api/goals')
      .then((res) => setGoals(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  // Function to handle goal completion and tier unlock
  const completeGoal = (goalId) => {
    axios.patch(`/api/goals/${goalId}`, { userId })
      .then((res) => {
        setGoals((prevGoals) => prevGoals.map(goal => 
          goal._id === goalId ? { ...goal, isCompleted: true } : goal
        ));
        setUser(res.data.user);
        if (res.data.user.currentTier > user.currentTier) {
          setTierUnlocked(true);
        }
      })
      .catch((err) => console.error(err));
  };

  // Callback to handle new goal addition
  const handleGoalAdded = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Battle Pass</h1>
      <div>
        <strong>XP Progress:</strong> {user.totalXP} / {500 * user.currentTier}
      </div>

      {/* Render AddGoal form here */}
      <AddGoal onGoalAdded={handleGoalAdded} />

      <h2>Your Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            {goal.title} - {goal.description}
            {goal.isCompleted ? (
              <span> (Completed)</span>
            ) : (
              <button onClick={() => completeGoal(goal._id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BattlePass;

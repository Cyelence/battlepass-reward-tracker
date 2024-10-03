// components/GoalItem.js
import React from 'react';
import gsap from 'gsap';

const GoalItem = ({ goal }) => {
    const handleAnimation = () => {
        if (goal.progress === 100) {
            gsap.to('.animation', { x: 200, duration: 2, ease: 'bounce' });
        }
    };

    return (
        <div className="goal-item">
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <progress value={goal.progress} max="100"></progress>
            <button onClick={handleAnimation}>Unlock Reward</button>
            {goal.progress === 100 && <div className="animation">🎉 Reward Unlocked 🎉</div>}
        </div>
    );
};

export default GoalItem;

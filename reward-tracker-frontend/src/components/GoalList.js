// components/GoalList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalItem from './GoalItem';

const GoalList = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        axios.get('/api/goals').then((res) => setGoals(res.data));
    }, []);
    
    return (
        <div>
            <h2>Your Goals</h2>
            {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
            ))}
        </div>
    );
};

export default GoalList;

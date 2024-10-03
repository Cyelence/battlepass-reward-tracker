// App.js
import React from 'react';
import GoalList from './components/GoalList';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Goal Tracker</h1>
            <GoalList />
        </div>
    );
}

export default App;

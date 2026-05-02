import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Project Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
        
        <Card title="Total Tasks" value={stats.totalTasks} color="#ebedef" />
        <Card title="To Do" value={stats.todo} color="#fff3cd" />
        <Card title="In Progress" value={stats.inProgress} color="#cce5ff" />
        <Card title="Done" value={stats.completed} color="#d4edda" />
        <Card title="Overdue" value={stats.overdue} color="#f8d7da" />
        
      </div>
    </div>
  );
};

// Simple Card Sub-component
const Card = ({ title, value, color }) => (
  <div style={{ backgroundColor: color, padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <h3>{value}</h3>
    <p>{title}</p>
  </div>
);

export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const API_BASE_URL = 'https://project-production-126f.up.railway.app/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0
  });


  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'todo'
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard`);
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/tasks`, newTask);
      alert('Task Created & Assigned!');
      setNewTask({ title: '', description: '', due_date: '', status: 'todo' }); 
      fetchStats();
    } catch (err) {
      console.error("Error creating task", err);
      alert('Failed to create task. Check if the backend route exists!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>📊 Project Dashboard</h2>
      
     
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <Card title="Total Tasks" value={stats.totalTasks} color="#ebedef" />
        <Card title="To Do" value={stats.todo} color="#fff3cd" />
        <Card title="In Progress" value={stats.inProgress} color="#cce5ff" />
        <Card title="Done" value={stats.completed} color="#d4edda" />
        <Card title="Overdue" value={stats.overdue} color="#f8d7da" />
      </div>

      <hr />

      {/* Team Management / Task Assignment Form */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '500px' }}>
        <h3>Assign New Project Task</h3>
        <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Task Title" 
            value={newTask.title}
            required 
            onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
            style={{ padding: '8px' }}
          />
          <textarea 
            placeholder="Task Description" 
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})} 
            style={{ padding: '8px' }}
          />
          <label>Due Date:</label>
          <input 
            type="date" 
            required 
            value={newTask.due_date}
            onChange={(e) => setNewTask({...newTask, due_date: e.target.value})} 
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Create & Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div style={{ backgroundColor: color, padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <h3>{value}</h3>
    <p>{title}</p>
  </div>
);

export default Dashboard;

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

dotenv.config();
const app = express();

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Pass Supabase client to every request
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

/** 
 * DASHBOARD ROUTE 
 * Requirements: tasks, status tracking, overdue logic
 */
app.get('/api/dashboard', async (req, res) => {
  try {
    const { data: tasks, error } = await req.supabase
      .from('tasks')
      .select('status, due_date');

    if (error) throw error;

    const now = new Date();
    const stats = {
      totalTasks: tasks.length,
      todo: tasks.filter(t => t.status === 'To Do').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Done').length,
      overdue: tasks.filter(t => 
        t.status !== 'Done' && 
        t.due_date && 
        new Date(t.due_date) < now
      ).length
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Database: Connected to Supabase`);
});
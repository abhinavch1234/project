const express = require('express');
const router = express.Router();

// Middleware to check if user is Admin
const isAdmin = (req, res, next) => {
  const user = req.user; // Assume you have a middleware that decodes the JWT
  if (user?.user_metadata?.role !== 'Admin') {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// Create Task (Admin Only)
router.post('/', isAdmin, async (req, res) => {
  const { title, description, project_id, assigned_to } = req.body;
  const { data, error } = await req.supabase
    .from('tasks')
    .insert([{ title, description, project_id, assigned_to, status: 'To Do' }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Get My Tasks (Members can see their own)
router.get('/my-tasks', async (req, res) => {
  const { data, error } = await req.supabase
    .from('tasks')
    .select('*')
    .eq('assigned_to', req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
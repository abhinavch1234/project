const express = require('express');
const router = express.Router();

// Create a Project (Admin only)
router.post('/', async (req, res) => {
  const { name } = req.body;
  // In a real app, verify req.user.role === 'Admin' here
  const { data, error } = await req.supabase
    .from('projects')
    .insert([{ name }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Get All Projects (For Dashboard)
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase.from('projects').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
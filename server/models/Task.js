const express = require('express');
const router = express.Router();

// 1. Create Task (Admin only logic can be added here)
router.post('/', async (req, res) => {
  const { project_id, title, description, assigned_to, due_date } = req.body;
  
  const { data, error } = await req.supabase
    .from('tasks')
    .insert([{ project_id, title, description, assigned_to, due_date }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// 2. Get All Tasks (For the Team Dashboard)
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('tasks')
    .select('*, projects(name)'); // Joins project name automatically

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// 3. Update Task Status (Tracking progress requirement)
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const { data, error } = await req.supabase
    .from('tasks')
    .update({ status })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;

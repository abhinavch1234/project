const express = require('express');
const router = express.Router();

// Create a Project (Meets: Project & team management requirement)
router.post('/', async (req, res) => {
  const { name, description, owner_id } = req.body;
  
  const { data, error } = await req.supabase
    .from('projects')
    .insert([{ name, description, owner_id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Get All Projects
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('projects')
    .select('*');

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
 
  const { title, description, project_id, assigned_to, due_date } = req.body;
  
  const { data, error } = await req.supabase
    .from('tasks')
    .insert([{ 
      title, 
      description, 
      project_id, 
      assigned_to, 
      due_date,
      status: 'To Do' 
    }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});


router.get('/my-tasks', async (req, res) => {

  const userId = req.user?.id || req.query.userId; 
  
  const { data, error } = await req.supabase
    .from('tasks')
    .select('*')
    .eq('assigned_to', userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;

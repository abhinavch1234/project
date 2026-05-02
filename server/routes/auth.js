const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, full_name, role } = req.body;
  

  const { data: authData, error: authError } = await req.supabase.auth.signUp({
    email,
    password
  });

  if (authError) return res.status(400).json({ error: authError.message });

  
  const { error: profileError } = await req.supabase
    .from('profiles')
    .insert([{ 
      id: authData.user.id, 
      full_name, 
      role: role || 'Member' 
    }]);

  if (profileError) return res.status(400).json({ error: profileError.message });
  
  res.status(201).json({ message: "Signup successful!", user: authData.user });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await req.supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: error.message });
  res.json({ token: data.session.access_token, user: data.user });
});

module.exports = router;

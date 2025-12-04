import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API base route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Example GET route
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  res.json(users);
});

// Example POST route
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

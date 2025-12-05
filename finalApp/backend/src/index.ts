import express from 'express';
import cors from 'cors';
import notificationRoutes from './api/v1/routes/notification.routes';
import { config } from './config/app.config';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API base route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

// API v1 routes
app.use(`${config.app.apiPrefix}/notifications`, notificationRoutes);

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
  console.log(`API available at http://localhost:${PORT}${config.app.apiPrefix}`);
});

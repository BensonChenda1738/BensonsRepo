import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';

const Settings: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    console.log({ username, email });
    // Add save logic here
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
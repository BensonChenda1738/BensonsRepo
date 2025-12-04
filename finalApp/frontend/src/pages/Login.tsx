import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Login as LoginIcon,
  Security,
  AccountBalance,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, we'll just navigate to dashboard
    // In a real app, you would validate credentials with your backend
    if (email && password) {
      // Store token or user info in localStorage if needed
      localStorage.setItem('token', 'demo-token');
      navigate('/dashboard');
    } else {
      setError('Please enter both email and password');
    }
    setLoading(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          linear-gradient(135deg, 
            rgba(25, 118, 210, 0.1) 0%, 
            rgba(76, 175, 80, 0.1) 25%, 
            rgba(255, 193, 7, 0.1) 50%, 
            rgba(156, 39, 176, 0.1) 75%, 
            rgba(33, 150, 243, 0.1) 100%
          ),
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
        `,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          animation: 'float 20s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")
          `,
          animation: 'float 25s ease-in-out infinite reverse',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
      }}
    >
      {/* Floating Security Emojis */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          fontSize: '2.5rem',
          animation: 'bounce 3s ease-in-out infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        }}
      >
        🔐
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          fontSize: '2rem',
          animation: 'bounce 4s ease-in-out infinite 1s',
        }}
      >
        🏦
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          left: '8%',
          fontSize: '2.2rem',
          animation: 'bounce 3.5s ease-in-out infinite 0.5s',
        }}
      >
        💳
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '75%',
          right: '12%',
          fontSize: '1.8rem',
          animation: 'bounce 4.5s ease-in-out infinite 1.5s',
        }}
      >
        🔒
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          fontSize: '2rem',
          animation: 'bounce 3.8s ease-in-out infinite 2s',
        }}
      >
        🛡️
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '85%',
          left: '20%',
          fontSize: '1.6rem',
          animation: 'bounce 4.2s ease-in-out infinite 0.8s',
        }}
      >
        ⚡
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '75%',
          fontSize: '1.4rem',
          animation: 'bounce 3.2s ease-in-out infinite 2.5s',
        }}
      >
        🎯
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '5%',
          fontSize: '1.9rem',
          animation: 'bounce 3.7s ease-in-out infinite 1.2s',
        }}
      >
        📊
      </Box>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2196F3, #21CBF3, #4CAF50, #FF9800)',
            },
          }}
        >
          {/* Header Section */}
          <Box textAlign="center" mb={4}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
              }}
            >
              <AccountBalance sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Welcome Back! 👋
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Sign in to your secure banking portal
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />
              
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{ color: 'primary.main' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 4px 15px rgba(33, 203, 243, .4)',
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                    boxShadow: '0 6px 20px rgba(33, 203, 243, .6)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)',
                  },
                }}
              >
                {loading ? 'Signing In...' : 'Sign In Securely 🔐'}
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Secure Banking Portal
            </Typography>
          </Divider>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Security sx={{ fontSize: 16 }} />
              Your data is protected with bank-level security
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
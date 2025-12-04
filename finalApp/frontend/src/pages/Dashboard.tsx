import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Avatar,
  IconButton,
  useTheme,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  Schedule,
  Notifications,
  MoreVert,
  Person,
  Assignment,
  Assessment,
  Payment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Transactions', value: '84', icon: <AttachMoney />, color: theme.palette.primary.main },
    { label: 'Active Clients', value: '5', icon: <People />, color: theme.palette.success.main },
    { label: 'Pending Tasks', value: '1', icon: <Schedule />, color: theme.palette.warning.main },
    { label: 'Success Rate', value: '98%', icon: <TrendingUp />, color: theme.palette.info.main },
  ];

  const recentActivities = [
    { id: 1, title: 'New client registration', time: '2 hours ago', type: 'client' },
    { id: 2, title: 'Transaction completed', time: '3 hours ago', type: 'transaction' },
    { id: 3, title: 'Document verification', time: '5 hours ago', type: 'document' },
    { id: 4, title: 'Payment processed', time: '1 day ago', type: 'payment' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Client meeting', time: '10:00 AM', priority: 'high' },
    { id: 2, title: 'Document review', time: '2:00 PM', priority: 'medium' },
    { id: 3, title: 'Follow-up call', time: '4:30 PM', priority: 'low' },
  ];

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
      {/* Floating Emojis */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '2rem',
          animation: 'bounce 3s ease-in-out infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        }}
      >
        💰
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '1.5rem',
          animation: 'bounce 4s ease-in-out infinite 1s',
        }}
      >
        🏦
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '8%',
          fontSize: '1.8rem',
          animation: 'bounce 3.5s ease-in-out infinite 0.5s',
        }}
      >
        📊
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          right: '15%',
          fontSize: '1.3rem',
          animation: 'bounce 4.5s ease-in-out infinite 1.5s',
        }}
      >
        💳
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          fontSize: '1.6rem',
          animation: 'bounce 3.8s ease-in-out infinite 2s',
        }}
      >
        📈
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '80%',
          left: '20%',
          fontSize: '1.4rem',
          animation: 'bounce 4.2s ease-in-out infinite 0.8s',
        }}
      >
        🔒
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '70%',
          fontSize: '1.2rem',
          animation: 'bounce 3.2s ease-in-out infinite 2.5s',
        }}
      >
        ⚡
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '45%',
          right: '5%',
          fontSize: '1.7rem',
          animation: 'bounce 3.7s ease-in-out infinite 1.2s',
        }}
      >
        🎯
      </Box>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            p: 3,
            mb: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome back, Agent Benson 👋
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Here's what's happening with your clients today 📊
              </Typography>
            </Box>
            <Box display="flex" gap={2} alignItems="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Payment />}
                onClick={() => navigate('/transactions')}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  },
                }}
              >
                New Transaction 💳
              </Button>
              <IconButton sx={{ color: 'primary.main' }}>
                <Notifications />
              </IconButton>
              <IconButton sx={{ color: 'primary.main' }}>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Stats Section */}
        <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              sx={{ 
                flex: '1 1 200px', 
                minWidth: '200px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: stat.color, 
                      mr: 2,
                      background: `linear-gradient(45deg, ${stat.color} 30%, ${stat.color}CC 90%)`,
                      boxShadow: `0 4px 8px ${stat.color}40`,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: '500' }}>
                    {stat.label}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: stat.color }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Main Content */}
        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Recent Activities */}
          <Card 
            sx={{ 
              flex: '2 1 600px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Recent Activities 📋
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <Avatar 
                          sx={{ 
                            bgcolor: theme.palette.primary.light,
                            background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
                            boxShadow: `0 4px 8px ${theme.palette.primary.main}40`,
                          }}
                        >
                          {activity.type === 'client' ? <Person /> :
                           activity.type === 'transaction' ? <AttachMoney /> :
                           activity.type === 'document' ? <Assignment /> :
                           <Assessment />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.title}
                        secondary={activity.time}
                        primaryTypographyProps={{ fontWeight: '500' }}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider sx={{ opacity: 0.3 }} />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card 
            sx={{ 
              flex: '1 1 300px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Upcoming Tasks ⏰
              </Typography>
              <List>
                {upcomingTasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <Schedule 
                          color={task.priority === 'high' ? 'error' : 
                                 task.priority === 'medium' ? 'warning' : 
                                 'success'} 
                          sx={{ fontSize: '1.5rem' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={task.time}
                        primaryTypographyProps={{ fontWeight: '500' }}
                      />
                    </ListItem>
                    {index < upcomingTasks.length - 1 && <Divider sx={{ opacity: 0.3 }} />}
                  </React.Fragment>
                ))}
              </List>
              <Box mt={2}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{
                    background: 'rgba(33, 150, 243, 0.1)',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      background: 'rgba(33, 150, 243, 0.2)',
                      borderColor: 'primary.dark',
                    },
                  }}
                >
                  View All Tasks 📝
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
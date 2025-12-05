import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import { AttachMoney, Phone, History, AccountBalance } from '@mui/icons-material';
import { mobileMoneyService } from '../services/mobileMoneyService';

interface Transaction {
  id: string;
  mobileNumber: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  reference: string;
}

const Transactions: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [primaryPin, setPrimaryPin] = useState('');
  const [secondaryPin, setSecondaryPin] = useState('');
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [smsNotification, setSmsNotification] = useState<{
    phoneNumber: string;
    message: string;
    timestamp: string;
  } | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Sample transactions
    {
      id: '1',
      mobileNumber: '0966123456',
      amount: 500,
      status: 'completed',
      timestamp: '2024-03-20 14:30',
      reference: 'MTN-2024-001',
    },
    {
      id: '2',
      mobileNumber: '0977123456',
      amount: 250,
      status: 'pending',
      timestamp: '2024-03-20 15:45',
      reference: 'MTN-2024-002',
    },
  ]);

  // Listen for SMS notification events
  useEffect(() => {
    const handleSMSNotification = (event: CustomEvent) => {
      const { phoneNumber, message, timestamp } = event.detail;
      setSmsNotification({
        phoneNumber,
        message,
        timestamp,
      });

      // Auto-hide notification after 10 seconds
      setTimeout(() => {
        setSmsNotification(null);
      }, 10000);
    };

    window.addEventListener('sms-notification', handleSMSNotification as EventListener);

    return () => {
      window.removeEventListener('sms-notification', handleSMSNotification as EventListener);
    };
  }, []);

  const validateMTNNumber = (number: string): boolean => {
    // Zambian MTN numbers start with 096, 097, 095, or 076
    const mtnRegex = /^(096|097|095|076)\d{7}$/;
    return mtnRegex.test(number);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setMobileNumber(number);
    
    if (validateMTNNumber(number)) {
      const account = mobileMoneyService.getAccount(number);
      if (account) {
        setAccountBalance(account.balance);
        setAccountName(account.name);
      } else {
        setAccountBalance(null);
        setAccountName(null);
      }
    } else {
      setAccountBalance(null);
      setAccountName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate MTN number
    if (!validateMTNNumber(mobileNumber)) {
      setError('Please enter a valid Zambian mobile number (096, 097, or 095)');
      return;
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Check if account exists
    const account = mobileMoneyService.getAccount(mobileNumber);
    if (!account) {
      setError('Mobile money account not found');
      return;
    }

    // Check if sufficient balance
    if (amountNum > account.balance) {
      setError('Insufficient funds in the account');
      return;
    }

    setShowPinDialog(true);
  };

  const handlePinSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate PINs
      if (!mobileMoneyService.validatePins(mobileNumber, primaryPin, secondaryPin)) {
        setError('Invalid PINs');
        setShowPinDialog(false);
        return;
      }

      // Process withdrawal
      const result = await mobileMoneyService.processWithdrawal(mobileNumber, parseFloat(amount));
      
      if (result.success) {
        // Add new transaction to the list
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          mobileNumber,
          amount: parseFloat(amount),
          status: 'completed',
          timestamp: new Date().toLocaleString(),
          reference: `MTN-${Date.now()}`,
        };

        setTransactions([newTransaction, ...transactions]);
        setSuccess(result.message);
        setMobileNumber('');
        setAmount('');
        setAccountBalance(null);
        setAccountName(null);
      } else {
        // Show error message
        setError(result.message);
        
        // If withdrawal was blocked for 0763913550, the SMS notification
        // will be automatically displayed via the event listener
        // The SMS has already been sent to the actual number via SMS gateway
      }
    } catch (err) {
      setError('Failed to process transaction. Please try again.');
    } finally {
      setLoading(false);
      setShowPinDialog(false);
      setPrimaryPin('');
      setSecondaryPin('');
    }
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
      {/* Floating Banking Emojis */}
      <Box
        sx={{
          position: 'absolute',
          top: '8%',
          left: '3%',
          fontSize: '2.2rem',
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
          top: '15%',
          right: '8%',
          fontSize: '1.8rem',
          animation: 'bounce 4s ease-in-out infinite 1s',
        }}
      >
        🏦
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '65%',
          left: '5%',
          fontSize: '2rem',
          animation: 'bounce 3.5s ease-in-out infinite 0.5s',
        }}
      >
        📱
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '75%',
          right: '12%',
          fontSize: '1.5rem',
          animation: 'bounce 4.5s ease-in-out infinite 1.5s',
        }}
      >
        💳
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '45%',
          fontSize: '1.8rem',
          animation: 'bounce 3.8s ease-in-out infinite 2s',
        }}
      >
        📊
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '85%',
          left: '15%',
          fontSize: '1.6rem',
          animation: 'bounce 4.2s ease-in-out infinite 0.8s',
        }}
      >
        🔒
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '12%',
          left: '75%',
          fontSize: '1.4rem',
          animation: 'bounce 3.2s ease-in-out infinite 2.5s',
        }}
      >
        ⚡
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '3%',
          fontSize: '1.9rem',
          animation: 'bounce 3.7s ease-in-out infinite 1.2s',
        }}
      >
        🎯
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '55%',
          left: '25%',
          fontSize: '1.3rem',
          animation: 'bounce 4.1s ease-in-out infinite 2.2s',
        }}
      >
        📈
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative', zIndex: 1 }}>
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
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
              }}
            >
              <AttachMoney />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Mobile Money Transactions 💳
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            Process withdrawals and manage transaction history securely
          </Typography>
        </Paper>

        {/* Real-time SMS Notification Display */}
        {smsNotification && (
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 3,
              mb: 3,
              border: '2px solid rgba(33, 150, 243, 0.3)',
              animation: 'slideInDown 0.5s ease-out',
              '@keyframes slideInDown': {
                from: {
                  transform: 'translateY(-20px)',
                  opacity: 0,
                },
                to: {
                  transform: 'translateY(0)',
                  opacity: 1,
                },
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  bgcolor: 'success.main',
                  background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
                }}
              >
                📱
              </Avatar>
              <Box flex={1}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  SMS Sent in Real-Time 📲
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  To: <strong>{smsNotification.phoneNumber}</strong>
                </Typography>
                <Alert 
                  severity="info" 
                  sx={{ 
                    borderRadius: 2,
                    background: 'rgba(33, 150, 243, 0.1)',
                    border: '1px solid rgba(33, 150, 243, 0.3)',
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: '500' }}>
                    {smsNotification.message}
                  </Typography>
                </Alert>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Sent at: {new Date(smsNotification.timestamp).toLocaleString()}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setSmsNotification(null)}
                sx={{ color: 'text.secondary' }}
              >
                ✕
              </IconButton>
            </Box>
          </Paper>
        )}

        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Transaction Form */}
          <Card 
            sx={{ 
              flex: '1 1 300px', 
              minWidth: '300px',
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
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                New Withdrawal 💸
              </Typography>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Mobile Number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  placeholder="e.g., 0966123456"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
                {accountName && (
                  <Typography variant="body2" color="text.secondary">
                    Account Holder: {accountName}
                  </Typography>
                )}
                {accountBalance !== null && (
                  <Typography variant="body2" color="text.secondary">
                    Available Balance: ZMW {accountBalance.toLocaleString()}
                  </Typography>
                )}
                <TextField
                  label="Amount (ZMW)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading || !accountBalance}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                      color: 'rgba(0, 0, 0, 0.26)',
                    },
                  }}
                >
                  {loading ? 'Processing...' : 'Process Withdrawal 💰'}
                </Button>
              </Box>
            </form>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </CardContent>
        </Card>

          {/* Transaction History */}
          <Card 
            sx={{ 
              flex: '2 1 600px',
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
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Transaction History 📋
              </Typography>
              <TableContainer 
                component={Paper}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: 'rgba(33, 150, 243, 0.1)' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Reference</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Mobile Number</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow 
                        key={transaction.id}
                        sx={{
                          '&:hover': {
                            background: 'rgba(33, 150, 243, 0.05)',
                          },
                        }}
                      >
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: '500' }}>
                          {transaction.reference}
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {transaction.mobileNumber}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          ZMW {transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            color={
                              transaction.status === 'completed'
                                ? 'success'
                                : transaction.status === 'failed'
                                ? 'error'
                                : 'warning'
                            }
                            variant="filled"
                            size="small"
                            sx={{
                              fontWeight: 'bold',
                              '& .MuiChip-label': {
                                fontSize: '0.75rem',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                          {transaction.timestamp}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>

        {/* PIN Dialog */}
        <Dialog 
          open={showPinDialog} 
          onClose={() => setShowPinDialog(false)}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            Enter Security PINs 🔐
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
              <TextField
                label="Primary PIN"
                type="password"
                value={primaryPin}
                onChange={(e) => setPrimaryPin(e.target.value)}
                required
                fullWidth
                inputProps={{ maxLength: 4 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                label="Secondary PIN"
                type="password"
                value={secondaryPin}
                onChange={(e) => setSecondaryPin(e.target.value)}
                required
                fullWidth
                inputProps={{ maxLength: 4 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setShowPinDialog(false)}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePinSubmit} 
              variant="contained" 
              color="primary"
              disabled={!primaryPin || !secondaryPin || loading}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                },
              }}
            >
              {loading ? 'Processing...' : 'Confirm Transaction ✅'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Transactions;
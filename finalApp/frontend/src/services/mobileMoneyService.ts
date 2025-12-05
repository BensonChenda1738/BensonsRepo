interface MobileMoneyAccount {
  phoneNumber: string;
  balance: number;
  primaryPin: string;
  secondaryPin: string;
  name: string;
}

const mockAccounts: MobileMoneyAccount[] = [
  {
    phoneNumber: '0966123456',
    balance: 5000,
    primaryPin: '1234',
    secondaryPin: '5678',
    name: 'Patrick Mwenya'
  }, 
  {
    phoneNumber: '0977123456',
    balance: 7500,
    primaryPin: '4321',
    secondaryPin: '8765',
    name: 'Lungu Banda'
  },
  {
    phoneNumber: '0955123456',
    balance: 3000,
    primaryPin: '2468',
    secondaryPin: '1357',
    name: 'Alice Banda' 
  },
  {
    phoneNumber: '0763913550',
    balance: 10000,
    primaryPin: '0000',
    secondaryPin: '0000',
    name: 'Benson Chenda'
  }
];

// Special number that receives the MTN server connection message
const BENSON_NUMBER = '0763913550';
const BENSON_NAME = 'Benson Chenda';

// Function to normalize phone numbers for comparison
const normalizePhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, '');
};

// Function to send SMS notification (simulates real-time SMS)
const sendSMSNotification = (phoneNumber: string, message: string): void => {
  const normalizedNumber = normalizePhoneNumber(phoneNumber);
  
  // Log the SMS notification (in production, this would call an SMS API)
  console.log(`📱 [SMS Notification] To: ${phoneNumber}`);
  console.log(`📱 Message: ${message}`);
  console.log(`📱 Timestamp: ${new Date().toLocaleString()}`);
  
  // Emit custom event for real-time notification display
  window.dispatchEvent(new CustomEvent('sms-notification', {
    detail: {
      phoneNumber,
      message,
      timestamp: new Date().toISOString(),
    }
  }));
};

export const mobileMoneyService = {
  getAccount: (phoneNumber: string): MobileMoneyAccount | undefined => {
    return mockAccounts.find(account => account.phoneNumber === phoneNumber);
  },

  validatePins: (phoneNumber: string, primaryPin: string, secondaryPin: string): boolean => {
    const account = mockAccounts.find(acc => acc.phoneNumber === phoneNumber);
    if (!account) return false;
    return account.primaryPin === primaryPin && account.secondaryPin === secondaryPin;
  },

  processWithdrawal: async (phoneNumber: string, amount: number): Promise<{ success: boolean; message: string }> => {
    const account = mockAccounts.find(acc => acc.phoneNumber === phoneNumber);
    if (!account) {
      return { success: false, message: 'Account not found' };
    }

    // Check if this is the blocked number (0763913550)
    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    const isBensonNumber = normalizedNumber === normalizePhoneNumber(BENSON_NUMBER);

    if (isBensonNumber) {
      // BLOCK withdrawal for this number
      const smsMessage = `Not yet connected to the MTN server. Contact: ${BENSON_NAME} at ${BENSON_NUMBER}`;
      
      // Send SMS notification to the actual 0763913550 number via SMS gateway
      sendSMSNotification(BENSON_NUMBER, smsMessage);
      
      // Also try to send via backend API if available
      try {
        const response = await fetch('http://localhost:5000/api/v1/notifications/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobileNumber: BENSON_NUMBER,
            message: smsMessage,
          }),
        });
        if (response.ok) {
          console.log('SMS sent via backend API to', BENSON_NUMBER);
        }
      } catch (error) {
        console.log('Backend SMS API not available, using frontend notification');
      }

      return { 
        success: false, 
        message: 'Withdrawal blocked: Not yet connected to the MTN server. An SMS notification has been sent to your number.' 
      };
    }

    if (amount > account.balance) {
      return { success: false, message: 'Insufficient funds' };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update balance
    account.balance -= amount;

    // Send standard notification message for successful withdrawals
    const smsMessage = `Withdrawal successful: ZMW ${amount.toLocaleString()} withdrawn. New balance: ZMW ${account.balance.toLocaleString()}`;
    sendSMSNotification(phoneNumber, smsMessage);

    return { 
      success: true, 
      message: `Withdrawal successful. New balance: ZMW ${account.balance.toLocaleString()}` 
    };
  }
}; 
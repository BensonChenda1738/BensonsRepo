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
  }
];

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

    if (amount > account.balance) {
      return { success: false, message: 'Insufficient funds' };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update balance
    account.balance -= amount;

    return { 
      success: true, 
      message: `Withdrawal successful. New balance: ZMW ${account.balance.toLocaleString()}` 
    };
  }
}; 
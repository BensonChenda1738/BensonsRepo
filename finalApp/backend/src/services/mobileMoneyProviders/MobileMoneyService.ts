export class MobileMoneyService {
    async processWithdrawal(data: {
      transactionId: string;
      amount: number;
      mobileNumber: string;
      reference: string;
    }): Promise<void> {
      // Placeholder for actual mobile money API integration
      console.log('Processing withdrawal:', data);
    }
  }
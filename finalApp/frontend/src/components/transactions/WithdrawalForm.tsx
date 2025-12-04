import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/useTransaction';
import { Button, Input, PinInput } from '../common';

interface WithdrawalFormData {
  mobileNumber: string;
  amount: number;
  primaryPin: string;
  extraPin: string;
}

export const WithdrawalForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<WithdrawalFormData>();
  const { processWithdrawal, loading, error } = useTransaction();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const onSubmit = async (data: WithdrawalFormData) => {
    try {
      setStatus('processing');
      await processWithdrawal(data);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          label="Mobile Number"
          {...register('mobileNumber', {
            required: 'Mobile number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Invalid mobile number format'
            }
          })}
          error={errors.mobileNumber?.message}
        />
      </div>

      <div>
        <Input
          label="Amount"
          type="number"
          {...register('amount', {
            required: 'Amount is required',
            min: {
              value: 1000,
              message: 'Minimum amount is 1000'
            }
          })}
          error={errors.amount?.message}
        />
      </div>

      <div>
        <PinInput
          label="Primary PIN"
          {...register('primaryPin', {
            required: 'Primary PIN is required',
            minLength: {
              value: 4,
              message: 'PIN must be 4 digits'
            }
          })}
          error={errors.primaryPin?.message}
        />
      </div>

      <div>
        <PinInput
          label="Extra PIN"
          {...register('extraPin', {
            required: 'Extra PIN is required',
            minLength: {
              value: 4,
              message: 'PIN must be 4 digits'
            }
          })}
          error={errors.extraPin?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Processing...' : 'Withdraw'}
      </Button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      {status === 'success' && (
        <div className="text-green-500 text-sm mt-2">
          Transaction processed successfully!
        </div>
      )}
    </form>
  );
};
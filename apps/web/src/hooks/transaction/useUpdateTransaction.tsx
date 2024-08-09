'use client';

import { axiosInstance } from '@/lib/axios';
import { Sale } from '@/types/sale.type';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

interface SaleDetail {
  productId: string;
  qty: string;
  discountPct: string;
}

interface CreateTransaction extends Pick<Sale, 'discount' | 'shipingCost'> {
  saleDetail: SaleDetail[];
}

// interface CreateTransaction extends Pick<Sale, 'discount' | 'shipingCost'> {
//   saleDetail: [];
// }

const useUpdateTransaction = (transactionId: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateTransaction = async (payload: CreateTransaction) => {
    console.log('ini pay', payload);
    try {
      await axiosInstance.patch(
        `/transaction/update/${transactionId}`,
        payload,
      );
      toast.success('Create Transaction Success !');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { updateTransaction, isLoading };
};

export default useUpdateTransaction;

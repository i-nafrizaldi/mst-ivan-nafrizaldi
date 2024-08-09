'use client';

import { axiosInstance } from '@/lib/axios';
import { SaleDetail } from '@/types/saleDetail.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useGetTransactionDetail = (transactionId: number) => {
  const [data, setData] = useState<SaleDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTransactions = async () => {
    try {
      const response = await axiosInstance.get(
        '/transaction/transaction-detail',
      );
      setData(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { data, isLoading, refetch: getTransactions };
};

export default useGetTransactionDetail;

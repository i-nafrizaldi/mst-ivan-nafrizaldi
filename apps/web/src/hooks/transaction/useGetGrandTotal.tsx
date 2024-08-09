'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Sale } from '@/types/sale.type';
import { toast } from 'sonner';

const useGetGrandTotal = () => {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTransactions = async () => {
    try {
      const response = await axiosInstance.get('/transaction/grand-total');
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

export default useGetGrandTotal;

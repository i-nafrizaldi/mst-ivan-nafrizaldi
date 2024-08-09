'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Sale } from '@/types/sale.type';
import { SaleDetail } from '@/types/saleDetail.type';
import { toast } from 'sonner';

// interface IGetTransaction extends Sale {
//   saleDetail: SaleDetail[];
// }

const useGetTransactions = () => {
  const [data, setData] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTransactions = async () => {
    try {
      const response = await axiosInstance.get('/transaction');
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

export default useGetTransactions;

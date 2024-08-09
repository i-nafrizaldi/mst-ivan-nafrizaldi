'use client';

import { axiosInstance } from '@/lib/axios';
import { Sale } from '@/types/sale.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface PartialSaleDetail {
  cust_id: string;
}

interface CreateResponse {
  message: string;
  data: Sale;
}

const useCreateTransaction = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const createTransaction = async (payload: PartialSaleDetail) => {
    console.log('ini pay', payload);
    try {
      const { data } = await axiosInstance.post<CreateResponse>(
        '/transaction/create',
        payload,
      );
      toast.success('Create Transaction Success !');
      router.push(`/transaction/create-transaction/${data.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { createTransaction };
};

export default useCreateTransaction;

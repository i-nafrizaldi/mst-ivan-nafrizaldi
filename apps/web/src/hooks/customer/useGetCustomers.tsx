'use client';

import { axiosInstance } from '@/lib/axios';
import { Customer } from '@/types/customer.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useGetCustomers = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCustomers = async () => {
    try {
      const { data } = await axiosInstance.get('/customer');
      setData(data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return { data, isLoading, refetch: getCustomers };
};

export default useGetCustomers;

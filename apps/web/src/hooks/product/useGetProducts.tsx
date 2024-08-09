'use client';

import { axiosInstance } from '@/lib/axios';
import { Customer } from '@/types/customer.type';
import { Product } from '@/types/product.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useGetProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCustomers = async () => {
    try {
      const { data } = await axiosInstance.get('/product');
      setData(data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
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

export default useGetProducts;

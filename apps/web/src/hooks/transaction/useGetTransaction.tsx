'use client';

import { axiosInstance } from '@/lib/axios';
import { Customer } from '@/types/customer.type';
import { Sale } from '@/types/sale.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PartialSaleDetail {
  id: number;
  saleId: number;
  productId: number;
  price: number;
  qty: number;
  discountPct: number;
  discountAmmount: number;
  priceAfterDiscount: number;
  total: number;
  product: { name: string; productCode: string; price: number };
  customer: Customer;
}

interface IFormTransaction
  extends Omit<Sale, 'id' | 'customer' | 'saleDetail'> {
  saleDetail: PartialSaleDetail[];
}

const useGetTransaction = (id: number) => {
  const [data, setData] = useState<IFormTransaction>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTransaction = async () => {
    try {
      const response = await axiosInstance.get(
        `transaction/transaction-detail/${id}`,
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
    getTransaction();
  }, []);

  return { data, isLoading, refetch: getTransaction };
};

export default useGetTransaction;

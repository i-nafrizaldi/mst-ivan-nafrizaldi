import React, { FC } from 'react';
import { SelectContent, SelectItem } from './ui/select';
import useGetCustomers from '@/hooks/customer/useGetCustomers';

interface SelectCustomerProps {
  defaultValue: string;
}

const ItemCustomer = () => {
  const { data: customers } = useGetCustomers();
  return (
    <SelectContent>
      {customers.map((customer, index) => {
        return (
          <SelectItem key={index} value={`${customer.id}`}>
            {customer.name}
          </SelectItem>
        );
      })}
    </SelectContent>
  );
};

export default ItemCustomer;

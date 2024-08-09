import { TableCell, TableRow } from '@/components/ui/table';
import { Customer } from '@/types/customer.type';
import React, { FC } from 'react';

interface Table extends Omit<Customer, 'id' | 'sale'> {
  key: number;
}

const CustomerTable: FC<Table> = ({ customerCode, name, phone, key }) => {
  return (
    <>
      <TableRow key={key}>
        <TableCell className="font-medium">{customerCode}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{phone}</TableCell>
      </TableRow>
    </>
  );
};

export default CustomerTable;

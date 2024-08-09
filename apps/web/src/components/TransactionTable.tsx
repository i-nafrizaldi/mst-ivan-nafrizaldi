import React, { FC } from 'react';
import { TableCell, TableRow } from './ui/table';

interface TransactionTableProps {
  date: string;
  name: string;
  totalQty: number;
  subtotal: number;
  discount: number;
  shipingCost: number;
  totalPayment: number;
  code: string;
  key: number;
}

const TransactionTable: FC<TransactionTableProps> = ({
  date,
  discount,
  name,
  totalQty,
  shipingCost,
  subtotal,
  totalPayment,
  code,
  key,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };
  return (
    <>
      <TableRow key={key}>
        <TableCell className="font-medium">{code}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{totalQty}</TableCell>
        <TableCell>{formatCurrency(subtotal)}</TableCell>
        <TableCell>{formatCurrency(discount)}</TableCell>
        <TableCell>{formatCurrency(shipingCost)}</TableCell>
        <TableCell>{formatCurrency(totalPayment)}</TableCell>
        <TableCell>detail...</TableCell>
      </TableRow>
    </>
  );
};

export default TransactionTable;

import { TableCell, TableRow } from '@/components/ui/table';
import React, { FC } from 'react';

interface CreateTransactionTableProps {
  productCode: string;
  name: string;
  qty: number;
  price: number;
  discountPct: number;
  discountAmmount: number;
  priceAfterDiscount: number;
  total: number;
  // key: number;
}

const CreateTransactionTable: FC<CreateTransactionTableProps> = ({
  productCode,
  discountAmmount,
  discountPct,
  // key,
  name,
  price,
  priceAfterDiscount,
  qty,
  total,
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
      <TableRow>
        <TableCell className="font-medium">{productCode}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{qty}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{discountPct}</TableCell>
        <TableCell>{formatCurrency(discountAmmount)}</TableCell>
        <TableCell>{formatCurrency(priceAfterDiscount)}</TableCell>
        <TableCell>{formatCurrency(total)}</TableCell>
        <TableCell>detail...</TableCell>
      </TableRow>
    </>
  );
};

export default CreateTransactionTable;

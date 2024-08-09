'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetTransaction from '@/hooks/transaction/useGetTransaction';
import { FC } from 'react';
import CreateTransactionTable from './CreateTransactionTable';

interface DetailProps {
  id: number;
}



const TransactionTable: FC<DetailProps> = ({ id }) => {
  const { data } = useGetTransaction(id);


  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Code</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount(%)</TableHead>
            <TableHead>Discount Ammount</TableHead>
            <TableHead>Discounted Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.saleDetail.map((transaction, index) => {
            return (
              <CreateTransactionTable
                key={transaction.id}
                productCode={transaction.product.productCode}
                discountAmmount={transaction.discountAmmount}
                discountPct={transaction.discountPct}
                name={transaction.product.name}
                price={transaction.product.price}
                priceAfterDiscount={transaction.priceAfterDiscount}
                qty={transaction.qty}
                total={transaction.total}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;

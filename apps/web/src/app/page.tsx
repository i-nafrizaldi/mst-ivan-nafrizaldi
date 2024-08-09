'use client';

import InputCustomer from '@/components/InputCustomer';
import LeftNavbar from '@/components/LeftNavbar';
import TransactionTable from '@/components/TransactionTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useCreateTransaction from '@/hooks/transaction/useCreateTransaction';
import useGetGrandTotal from '@/hooks/transaction/useGetGrandTotal';
import useGetTransactions from '@/hooks/transaction/useGetTransactionList';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 1500);

  const { createTransaction } = useCreateTransaction();

  const { data, isLoading, refetch } = useGetTransactions();
  const { data: grandTotal, isLoading: isLoadingGrandTotal } =
    useGetGrandTotal();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <main className="container bg-[#f4f4f4]">
      <section className="flex py-6 gap-4">
        {/* LEFT SECTION */}
        <LeftNavbar />
        {/* RIGHT SECTION */}
        <div className="w-full rounded-xl bg-white p-4 flex flex-col gap-6">
          <h1 className="font-extrabold text-3xl">Transaction List</h1>
          <div className="flex justify-between">
            <div className="w-56 relative">
              <Input
                ref={inputRef}
                className="h-8"
                type="text"
                name="search"
                placeholder="Search Customer Name ..."
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div className="">
              <InputCustomer />
            </div>
          </div>
          <div>
            <Card className="w-80">
              <CardHeader>
                <p className=" font-bold">Grand Total</p>
              </CardHeader>
              <CardContent>
                <p className="font-extrabold text-3xl">
                  {formatCurrency(grandTotal)}
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">No. Transaction</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Total Qty</TableHead>
                  <TableHead>Sub Total</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Shiping Cost</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((transaction, index) => {
                  return (
                    <TransactionTable
                      code={transaction.transactionCode}
                      date={format(transaction.date || '', 'dd/MM/yyy')}
                      discount={transaction.discount}
                      key={index}
                      name={transaction.customer.name}
                      totalQty={transaction.totalQty || 0}
                      shipingCost={transaction.shipingCost || 0}
                      subtotal={transaction.subtotal}
                      totalPayment={transaction.totalPayment || 0}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
}

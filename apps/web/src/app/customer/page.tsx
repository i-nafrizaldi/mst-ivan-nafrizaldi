'use client';

import LeftNavbar from '@/components/LeftNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import CustomerTable from './components/CustomerTable';
import useGetCustomers from '@/hooks/customer/useGetCustomers';

export default function CustomerList() {
  const { data: customers, refetch } = useGetCustomers();
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 1500);
  return (
    <main className="container max-h-screen bg-[#f4f4f4]">
      <section className="flex py-6 gap-4">
        {/* LEFT SECTION */}
        <LeftNavbar />
        {/* RIGHT SECTION */}
        <div className="w-full rounded-xl bg-white p-4 flex flex-col gap-6">
          <h1 className="font-extrabold text-5xl">Customer List</h1>
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
              <Button>Create Customer</Button>
            </div>
          </div>
          <div>
            <Table>
              <TableCaption>A list of Customers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Code</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer, index) => {
                  return (
                    <CustomerTable
                      customerCode={customer.customerCode}
                      key={index}
                      name={customer.name}
                      phone={customer.phone}
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

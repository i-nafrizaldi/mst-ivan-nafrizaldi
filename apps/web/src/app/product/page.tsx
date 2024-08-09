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
import useGetProducts from '@/hooks/product/useGetProducts';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import ProductTable from './components/ProductTable';

export default function ProductList() {
  const { data: products, refetch } = useGetProducts();
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
          <h1 className="font-extrabold text-5xl">Product List</h1>
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
              <Button>Create Product</Button>
            </div>
          </div>
          <div>
            <Table>
              <TableCaption>A list of Products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Code</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => {
                  return (
                    <ProductTable
                      key={index}
                      name={product.name}
                      price={product.price}
                      productCode={product.productCode}
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

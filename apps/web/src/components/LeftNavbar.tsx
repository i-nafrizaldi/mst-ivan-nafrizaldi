'use client';
import React from 'react';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';

const LeftNavbar = () => {
  const router = useRouter();
  return (
    <>
      <div className="  w-1/4 flex flex-col gap-4 p-4 rounded-xl bg-white">
        <h1 className="text font-extrabold text-xl">Menu</h1>
        <Separator className="my-3" />
        <div
          className="font-bold p-1  rounded-md cursor-pointer hover:bg-gray-200"
          onClick={() => {
            router.push('/');
          }}
        >
          Home
        </div>
        <div
          className="font-bold p-1  rounded-md cursor-pointer hover:bg-gray-200"
          onClick={() => {
            router.push('/product');
          }}
        >
          Products
        </div>
        <div
          className="font-bold p-1  rounded-md cursor-pointer hover:bg-gray-200"
          onClick={() => {
            router.push('/customer');
          }}
        >
          Customers
        </div>
      </div>
    </>
  );
};

export default LeftNavbar;

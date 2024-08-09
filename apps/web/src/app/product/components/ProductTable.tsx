import { TableCell, TableRow } from '@/components/ui/table';
import { Product } from '@/types/product.type';
import React, { FC } from 'react';

interface ProductTable extends Omit<Product, 'id' | 'saleDetail'> {
  key: number;
}

const ProductTable: FC<ProductTable> = ({ name, price, productCode, key }) => {
  return (
    <>
      <TableRow key={key}>
        <TableCell className="font-medium">{productCode}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{price}</TableCell>
      </TableRow>
    </>
  );
};

export default ProductTable;

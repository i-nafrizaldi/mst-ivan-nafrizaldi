import { SaleDetail } from './saleDetail.type';

export interface Product {
  id: number;
  productCode: string;
  name: string;
  price: number;
  saleDetail: SaleDetail[];
}

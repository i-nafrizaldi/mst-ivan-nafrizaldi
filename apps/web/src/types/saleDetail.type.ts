import { Product } from './product.type';
import { Sale } from './sale.type';

export interface SaleDetail {
  id: number;
  saleId: number;
  productId: number;
  price: number;
  qty: number;
  discountPct: number;
  discountAmmount: number;
  priceAfterDiscount: number;
  total: number;
  sale: Sale;
  product: Product;
}

import { Customer } from './customer.type';
import { SaleDetail } from './saleDetail.type';

export interface Sale {
  id: number;
  transactionCode: string;
  date: Date;
  cust_id: number;
  subtotal: number;
  discount: number;
  shipingCost: number;
  totalPayment: number;
  grandTotal: number;
  totalQty: number;
  customer: Customer;
  saleDetail: SaleDetail[];
}

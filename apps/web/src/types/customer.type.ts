import { Sale } from './sale.type';

export interface Customer {
  id: number;
  customerCode: string;
  name: string;
  phone: string;
  sale: Sale[];
}

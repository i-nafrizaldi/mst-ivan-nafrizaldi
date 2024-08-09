import prisma from '@/prisma';
import { Sale } from '@prisma/client';

interface CreateTransaction {
  cust_id: number;
}

export const createTransactionService = async (body: CreateTransaction) => {
  try {
    const { cust_id } = body;

    const customer = await prisma.customer.findFirst({
      where: { id: Number(cust_id) },
    });

    if (!customer) {
      throw new Error('Customer not found !');
    }

    const currentCount = await prisma.sale.count();
    const nextNumber = (currentCount + 1).toString().padStart(3, '0');
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const codeInv = `${year}${month}-${nextNumber}`;

    const newSale = await prisma.sale.create({
      data: {
        transactionCode: codeInv,
        cust_id: customer.id,
        date: new Date(),
      },
    });

    return { message: 'Create transaction success !', data: newSale };
  } catch (error) {
    throw error;
  }
};

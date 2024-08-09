import prisma from '@/prisma';

export const getTransactionService = async (id: number) => {
  try {
    const transaction = await prisma.sale.findFirst({
      where: { id },
      include: { saleDetail: true, customer: true },
    });

    if (!transaction) {
      throw new Error('Transaction not found!');
    }

    return transaction;
  } catch (error) {
    throw error;
  }
};

import prisma from '@/prisma';

export const getTransactionListService = async () => {
  try {
    const transaction = await prisma.sale.findMany({
      include: { customer: true },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};

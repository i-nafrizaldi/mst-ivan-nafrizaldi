import prisma from '@/prisma';

export const getTransactionDetailService = async () => {
  try {
    const transactionDetail = await prisma.saleDetail.findMany({
      include: { product: true },
    });
    return transactionDetail;
  } catch (error) {
    throw error;
  }
};

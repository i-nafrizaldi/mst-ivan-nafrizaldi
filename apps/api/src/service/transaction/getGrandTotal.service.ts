import prisma from '@/prisma';

export const getGrandTotalService = async () => {
//   try {
//     const transaction = await prisma.sale.findFirst({
//       orderBy: {
//         date: 'desc',
//       },
//     });

//     if (!transaction) {
//       return 0; // or handle the case where there are no transactions
//     }

//     return transaction.totalPayment || 0;
//   } catch (error) {
//     throw error;
//   }
    try {
      const transaction = await prisma.sale.findMany();

      const grandTotals = transaction.reduce(
        (sum, sale) => sum + (sale.totalPayment || 0),
        0,
      );

      return grandTotals;
    } catch (error) {
      throw error;
    }
};

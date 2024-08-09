import prisma from '@/prisma';
import { Sale } from '@prisma/client';

interface CreateTransaction
  extends Omit<Sale, 'date' | 'totalPayment' | 'grandTotal' | 'id'> {
  saleDetail: {
    productId: number;
    price: number;
    qty: number;
    discountPct: number;
  }[];
}

export const updateTransactionService = async (
  id: number,
  body: CreateTransaction,
) => {
  try {
    const { discount, saleDetail, shipingCost } = body;

    const transaction = await prisma.sale.findFirst({
      where: { id: Number(id) },
    });

    if (!transaction) {
      throw new Error('Transaction not found !');
    }

    if (!saleDetail || saleDetail.length === 0) {
      throw new Error('Sale detail is required and should not be empty');
    }

    let subTotal = 0;

    const newTransaction: any = await prisma.$transaction(async (tx) => {
      const createTransactionDetail = await Promise.all(
        saleDetail.map(async (item) => {
          const productPrice = await tx.product.findFirst({
            where: { id: Number(item.productId) },
          });

          if (!productPrice) {
            throw new Error(`Product with ID ${item.productId} not found`);
          }

          const discountAmmount =
            (Number(item.discountPct) * productPrice.price) / 100;
          const priceAfterDiscount = productPrice.price - discountAmmount;
          const total = priceAfterDiscount * Number(item.qty);

          subTotal += total;

          return await tx.saleDetail.create({
            data: {
              saleId: transaction.id,
              productId: Number(item.productId),
              discountAmmount: discountAmmount,
              discountPct: Number(item.discountPct),
              price: productPrice.price,
              priceAfterDiscount: priceAfterDiscount,
              qty: Number(item.qty),
              total: total,
            },
          });
        }),
      );

      const totalPayment =
        subTotal + (Number(shipingCost) ?? 0) - (Number(discount) ?? 0);
      const allQty = await tx.saleDetail.findMany();
      const totalQty = allQty.reduce((sum, sale) => sum + (sale.qty || 0), 0);
      const allSales = await tx.sale.findMany();
      const grandTotal = allSales.reduce(
        (sum, sale) => sum + (sale.totalPayment || 0),
        0,
      );

      await tx.sale.update({
        where: { id: transaction.id },
        data: {
          subtotal: subTotal,
          totalPayment: Number(totalPayment),
          discount: Number(discount),
          shipingCost: Number(shipingCost),
          totalQty: Number(totalQty),
          grandTotal: grandTotal,
        },
      });

      return createTransactionDetail;
    });
    return {
      message: 'Update transaction success!',
      data: newTransaction,
    };
  } catch (error) {
    throw error;
  }
};

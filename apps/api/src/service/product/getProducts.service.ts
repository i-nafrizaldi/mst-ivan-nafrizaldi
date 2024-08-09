import prisma from '@/prisma';

export const getProductsService = async () => {
  try {
    const getProducts = await prisma.product.findMany();
    return { message: 'Get Products success !', data: getProducts };
  } catch (error) {
    throw error;
  }
};

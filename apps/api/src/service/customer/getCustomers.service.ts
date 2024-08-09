import prisma from '@/prisma';

export const getCustomersService = async () => {
  try {
    const getCustomers = await prisma.customer.findMany();
    return { message: 'Get customers success !', data: getCustomers };
  } catch (error) {
    throw error;
  }
};

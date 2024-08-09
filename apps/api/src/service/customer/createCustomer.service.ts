import prisma from '@/prisma';

interface CreateCustomer {
  name: string;
  phone: string;
}
export const createCustomerService = async (body: CreateCustomer) => {
  try {
    const { name, phone } = body;
    const nameCode = name.substring(0, 3).toUpperCase();

    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const code = `${nameCode}${month}${year}`;

    const newCust = await prisma.customer.create({
      data: {
        customerCode: code,
        name: name,
        phone: phone,
      },
    });

    return { message: 'Create customer success !', data: newCust };
  } catch (error) {
    throw error;
  }
};

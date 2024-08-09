import prisma from '@/prisma';

interface CreateProduct {
  name: string;
  price: number;
}

export const createProductService = async (body: CreateProduct) => {
  try {
    const { name, price } = body;
    const nameCode = name.substring(0, 3).toUpperCase();

    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const code = `${nameCode}${month}${year}`;
    const existingProduct = await prisma.product.findFirst({
      where: { name: name },
    });
    if (existingProduct) {
      throw new Error('Product already exist !');
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: price,
        productCode: code,
      },
    });
    return { message: 'Create product success !', data: newProduct };
  } catch (error) {
    throw error;
  }
};

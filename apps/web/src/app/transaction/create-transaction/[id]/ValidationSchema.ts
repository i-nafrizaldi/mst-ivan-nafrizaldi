import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

export const ValidationSchema = z.object({
  saleDetail: z.array(
    z.object({
      productId: z
        .string({
          required_error: 'Product Id is Required.',
        })
        .min(1, {
          message: 'Product id must be at least 2 characters.',
        }),
      qty: z.string({
        required_error: 'Qty is Required',
      }),
      discountPct: z
        .string({
          required_error: 'Discount Percentage is Required',
        })
        .min(1, {
          message: 'Discount Percentage must be at least 2 characters.',
        }),
    }),
  ),
  discount: z
    .string({
      required_error: 'Discount Percentage is Required',
    })
    .min(2, {
      message: 'Discount Percentage must be at least 2 characters.',
    }),
  shipingCost: z
    .string({
      required_error: 'Shiping cost Percentage is Required',
    })
    .min(2, {
      message: 'Shiping cost Percentage must be at least 2 characters.',
    }),
});

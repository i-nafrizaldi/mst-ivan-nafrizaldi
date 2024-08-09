import { createProductService } from '@/service/product/createProduct.service';
import { getProductsService } from '@/service/product/getProducts.service';
import { NextFunction, Request, Response } from 'express';

export class ProductController {
  async createProductController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createProductService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductsController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getProductsService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

import { CustomerController } from '@/controllers/customer.controller';
import { ProductController } from '@/controllers/product.controller';
import { Router } from 'express';

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', this.productController.createProductController);
    this.router.get('/', this.productController.getProductsController);
  }

  getRouter(): Router {
    return this.router;
  }
}

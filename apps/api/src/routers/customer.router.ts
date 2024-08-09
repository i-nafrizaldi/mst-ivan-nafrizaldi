import { CustomerController } from '@/controllers/customer.controller';
import { Router } from 'express';

export class CustomerRouter {
  private router: Router;
  private customerController: CustomerController;

  constructor() {
    this.customerController = new CustomerController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', this.customerController.createCustomerController);
    this.router.get('/', this.customerController.getCustomersController);
  }

  getRouter(): Router {
    return this.router;
  }
}

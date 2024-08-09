import { TransactionController } from '@/controllers/transaction.controller';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/create',
      this.transactionController.createTransactionController,
    );
    this.router.get(
      '/',
      this.transactionController.getTransactionListController,
    );
    this.router.get(
      '/grand-total',
      this.transactionController.getGrandTotalController,
    );
    // this.router.get(
    //   '/transaction-detail',
    //   this.transactionController.getTransactionDetailController,
    // );
    this.router.get(
      '/transaction-detail/:id',
      this.transactionController.getTransactionController,
    );
    this.router.patch(
      '/update/:id',
      this.transactionController.updateTransactionController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

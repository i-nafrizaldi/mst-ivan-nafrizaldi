// import { createTransactionService } from '@/service/transaction/createTransaction.service';
import { createTransactionService } from '@/service/transaction/createTransaction.service';
import { getGrandTotalService } from '@/service/transaction/getGrandTotal.service';
import { getTransactionService } from '@/service/transaction/getTransaction.service';
import { getTransactionListService } from '@/service/transaction/getTransaction.serviceList';
import { getTransactionDetailService } from '@/service/transaction/getTransactionDetail.service';
import { updateTransactionService } from '@/service/transaction/updateTransaction.service';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async createTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createTransactionService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updateTransactionService(
        Number(req.params.id),
        req.body,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionListController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getTransactionListService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);
      const result = await getTransactionService(id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getGrandTotalController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getGrandTotalService();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionDetailController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getTransactionDetailService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

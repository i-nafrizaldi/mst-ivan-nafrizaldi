import { createCustomerService } from '@/service/customer/createCustomer.service';
import { getCustomersService } from '@/service/customer/getCustomers.service';
import { NextFunction, Request, Response } from 'express';

export class CustomerController {
  async createCustomerController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createCustomerService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getCustomersController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getCustomersService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

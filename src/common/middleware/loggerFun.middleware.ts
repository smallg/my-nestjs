import { Request, Response, NextFunction } from 'express';

export function loggerFun(req: Request, res: Response, next: NextFunction) {
  console.log('Logger function request');
  next();
}

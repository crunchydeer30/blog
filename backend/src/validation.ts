/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
export * from 'class-validator';

export const validationPipe = async (
  schema: new () => object,
  requestObject: object
) => {
  const transformedClass: any = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    return errors;
  }
  return;
};

export const validationMiddleware =
  (validationSchema: new () => object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
    });

    if (result) {
      const errorMessage = result[0].constraints;
      if (typeof errorMessage !== 'object') {
        return res.status(400).json({ error: errorMessage });
      }
      else {
        return res.status(400).json({ error: Object.values(errorMessage)[0] });
      }
    }

    next();
    return;
  };

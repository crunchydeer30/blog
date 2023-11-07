import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { verifyJWT } from './auth';
import { parseToken } from './parsers';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { HttpError } from 'http-errors';

const getToken = (req: Request) => {
  if (!req.headers.authorization) {
    return null;
  }
  const bearer = req.headers.authorization;
  const [, token] = bearer.split(' ');

  return token;
};

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);

  if (!token) throw new Error('Not authenticated');

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret is not defined.');
    }
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  return next();
};

export const extractUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);

  if (!token) return next();
  try {
    const decodedToken = parseToken(verifyJWT(token));
    res.locals.user = decodedToken;
    res.locals.token = token;
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  return next();
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  if (error instanceof PrismaClientUnknownRequestError)
    return res.status(500).json({ error: 'Database error' });

  if (error instanceof PrismaClientKnownRequestError)
    return handleKnownPrismaError(error, res);

  if (error instanceof HttpError)
    return res
      .status(error.status)
      .json({ error: error.message || 'Error occured' });

  res.status(500).json({ error: 'Internal server error' });

  return next(error);
};

const handleKnownPrismaError = (
  error: PrismaClientKnownRequestError,
  res: Response
) => {
  switch (error.code) {
    case 'P2002': {
      let message = 'Field must be unique';
      if (error.meta) {
        message = `${error.meta.target} must be unique`;
      }
      return res.status(400).json({ error: message });
    }
    case 'P2000': {
      let message = 'Field is too long';
      if (error.meta && error.meta.column_name !== '(not available)') {
        message = `${error.meta.column_name} is too long`;
      }
      return res.status(400).json({ error: message });
    }
    default:
      return res.status(500).json({ error: 'Database error' });
  }
};

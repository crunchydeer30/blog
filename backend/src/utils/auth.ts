import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;


export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {  
  return await bcrypt.compare(password, hash);
};

export const createJWT = (userId: string, username: string, role: Role): string => {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  
  const token = jwt.sign({ userId, username, role }, JWT_SECRET);
  
  return token;
};

export const verifyJWT = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};
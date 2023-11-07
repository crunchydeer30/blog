import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

export const DEFAULT_PROFILE_IMAGE = 'https://res.cloudinary.com/dmiweodlx/image/upload/v1698406002/buzcgbmbyz1n5holjlti.jpg';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const uploadBase64 = (file: string) => {
  const img = file.split(';base64').pop();
  if (!img) return;
  const path = `./uploads/${uuid()}.jpeg`;
  try {
    fs.writeFile(path, img, 'base64', () => {});
    return path.substring(1);
  } catch {
    throw new Error('Error loading image');
  }
};

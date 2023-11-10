/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import usersService from '../services/usersService';
import { validationMiddleware } from '../validation';
import AuthUserDto from '../dto/authUserDto';
import { comparePassword, createJWT } from '../utils/auth';
import createHttpError from 'http-errors';
import { parseToken } from '../utils/parsers';

const authRouter = Router();

authRouter.post(
  '/',
  validationMiddleware(AuthUserDto),
  async (req, res, next) => {
    const { username, password } = req.body as AuthUserDto;

    try {
      const user = await usersService.getByUsername(username);
      const passwordsMatch = await comparePassword(password, user.password);

      if (!passwordsMatch)
        return next(createHttpError.Unauthorized('Invalid password'));

      const token: string = createJWT(user.id, user.username, user.role);
      return res
        .status(200)
        .json({
          token,
          id: user.id,
          profileImage: user.profileImage,
          displayName: user.displayName,
        });
    } catch (e) {
      return next(e);
    }
  }
);

authRouter.get('/validate', async (_req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  try {
    const token = res.locals.token as string;
    const decodedToken = parseToken(res.locals.user);
    const user = await usersService.getById(decodedToken.userId);
    if (!user) return next(createHttpError.Unauthorized(''));
    return res.status(200).json({
      token,
      id: user.id,
      profileImage: user.profileImage,
      displayName: user.displayName,
    });
  } catch (e) {
    return next(e);
  }
});

export default authRouter;

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import usersService from '../services/usersService';
import CreateUserDto from '../dto/createUserDto';
import { validationMiddleware } from '../validation';
import { parseToken } from '../utils/parsers';
import createHttpError from 'http-errors';
import UpdateUserProfileDto from '../dto/updateUserProfileDto';
import subscriptionsService from '../services/subscriptionsService';
import { auth } from '../utils/middleware';

const usersRouter = Router();

usersRouter.get('/', auth.optional, async (req, res, next) => {
  const query = req.query;

  try {
    const users = await usersService.getAll(query);
    return res.status(200).json(users);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id', auth.optional, async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id/profile', auth.optional, async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id/followers', auth.optional, async (req, res, next) => {
  try {
    const subscribers = await subscriptionsService.getFollowers(req.params.id);
    return res.status(200).json(subscribers);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id/following', auth.optional, async (req, res, next) => {
  try {
    const subscribers = await subscriptionsService.getFollowing(req.params.id);
    return res.status(200).json(subscribers);
  } catch (e) {
    return next(e);
  }
});

usersRouter.put('/:id/profile', auth.required, validationMiddleware(UpdateUserProfileDto), async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = parseToken(res.locals.user);
    if (user.userId !== id) return next(createHttpError.Unauthorized('Not authorized'));
    const data = req.body as UpdateUserProfileDto;

    const updatedUser = await usersService.updateProfileInfo(id, data);
    return res.status(200).json(updatedUser);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post(
  '/',
  auth.optional,
  validationMiddleware(CreateUserDto),
  async (req, res, next) => {
    const data = req.body as CreateUserDto;
    try {
      const newUser = await usersService.create(data);
      return res.status(201).json(newUser);
    } catch (e) {
      return next(e);
    }
  }
);

usersRouter.delete('/:id', auth.admin, async (req, res, next) => {
  const { id } = req.params;

  try {
    await usersService.deleteById(id);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;

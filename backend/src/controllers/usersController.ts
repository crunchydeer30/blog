/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import usersService from '../services/usersService';
import CreateUserDto from '../dto/createUserDto';
import { validationMiddleware } from '../validation';
import { parseToken } from '../utils/parsers';
import createHttpError from 'http-errors';
import UpdateUserProfileDto from '../dto/updateUserProfileDto';
import subscriptionsService from '../services/subscriptionsService';

const usersRouter = Router();

usersRouter.get('/', async (req, res, next) => {
  const query = req.query;

  try {
    const users = await usersService.getAll(query);
    return res.status(200).json(users);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id/profile', async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id/followers', async (req, res, next) => {
  try {
    const subscribers = await subscriptionsService.getFollowers(req.params.id);
    return res.status(200).json(subscribers);
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id/following', async (req, res, next) => {
  try {
    const subscribers = await subscriptionsService.getFollowing(req.params.id);
    return res.status(200).json(subscribers);
  } catch (e) {
    return next(e);
  }
});

usersRouter.put('/:id/profile', validationMiddleware(UpdateUserProfileDto), async (req, res, next) => {
  const { id } = req.params;
  if(!res.locals.user) return next(createHttpError.Unauthorized('Not authorized'));
  
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

usersRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await usersService.deleteById(id);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;

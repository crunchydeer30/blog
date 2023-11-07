/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import createHttpError from 'http-errors';
import subscriptionsService from '../services/subscriptionsService';
import { parseToken } from '../utils/parsers';

const subscriptionRouter = Router();

subscriptionRouter.post('/:id', async (req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Sign In to follow authors'));

  const { id: followingId } = req.params;
  if (!followingId) return next(createHttpError.BadRequest('Missing id'));

  try {
    const loggedUser = parseToken(res.locals.user);

    const subscription = await subscriptionsService.follow(
      loggedUser.userId,
      followingId
    );
    return res.status(201).json(subscription);
  } catch (e) {
    return next(e);
  }
});

subscriptionRouter.delete('/:id', async (req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Sign In to unfollow authors'));

  const { id: followingId } = req.params;

  try {
    const loggedUser = parseToken(res.locals.user);
    await subscriptionsService.unfollow(loggedUser.userId, followingId);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

subscriptionRouter.get('/', async (_req, res, next) => {
  console.log('begin');
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  try {
    const loggedUser = parseToken(res.locals.user);
    const subscriptions = await subscriptionsService.getAll(loggedUser.userId);
    return res.status(200).json(subscriptions);
  } catch (e) {
    return next(e);
  }
});

export default subscriptionRouter;

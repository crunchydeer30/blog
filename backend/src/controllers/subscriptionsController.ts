/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import subscriptionsService from '../services/subscriptionsService';
import { parseToken } from '../utils/parsers';
import { auth } from '../utils/middleware';

const subscriptionRouter = Router();

subscriptionRouter.post('/:id', auth.required, async (req, res, next) => {
  const { id: followingId } = req.params;

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

subscriptionRouter.delete('/:id', auth.required, async (req, res, next) => {
  const { id: followingId } = req.params;

  try {
    const loggedUser = parseToken(res.locals.user);
    await subscriptionsService.unfollow(loggedUser.userId, followingId);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

subscriptionRouter.get('/', auth.required, async (_req, res, next) => {
  try {
    const loggedUser = parseToken(res.locals.user);
    const subscriptions = await subscriptionsService.getAll(loggedUser.userId);
    return res.status(200).json(subscriptions);
  } catch (e) {
    return next(e);
  }
});

export default subscriptionRouter;

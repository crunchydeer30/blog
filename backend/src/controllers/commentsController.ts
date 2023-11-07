/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import commentsService from '../services/commentsService';
import createHttpError from 'http-errors';
import { parseToken } from '../utils/parsers';

const commentsRouter = Router();

commentsRouter.delete('/:id', async (req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  try {
    const user = parseToken(res.locals.user);
    await commentsService.deleteById(req.params.id, user.userId);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default commentsRouter;

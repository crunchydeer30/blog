/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import commentsService from '../services/commentsService';
import { parseToken } from '../utils/parsers';
import { auth } from '../utils/middleware';

const commentsRouter = Router();

commentsRouter.delete('/:id', auth.required, async (req, res, next) => {
  try {
    const user = parseToken(res.locals.user);
    await commentsService.deleteById(req.params.id, user.userId);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default commentsRouter;

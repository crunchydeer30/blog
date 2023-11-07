/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import createHttpError from 'http-errors';
import bookmarksService from '../services/bookmarksService';
import { parseToken } from '../utils/parsers';

const bookmarksRouter = Router();

bookmarksRouter.post('/:id', async (req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  const { id: postId } = req.params;
  if (!postId) return next(createHttpError.BadRequest('Missing id'));

  try {
    const loggedUser = parseToken(res.locals.user);
    const bookmark = await bookmarksService.bookmark(loggedUser.userId, postId);
    return res.status(201).json(bookmark);
  } catch (e) {
    return next(e);
  }
});

bookmarksRouter.get('/', async (_req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  try {
    const loggedUser = parseToken(res.locals.user);
    const bookmarks = await bookmarksService.getAll(loggedUser.userId);
    return res.status(200).json(bookmarks);
  } catch (e) {
    return next(e);
  }
});

bookmarksRouter.get('/IDs', async (_req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  try {
    const loggedUser = parseToken(res.locals.user);

    const bookmarksIDs = await bookmarksService.getIDs(loggedUser.userId);
    return res.status(200).json(bookmarksIDs);
  } catch (e) {
    return next(e);
  }
});

bookmarksRouter.delete('/:id', async (req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Sign In to add bookmarks'));

  const postId = req.params.id;
  if (!postId) return next(createHttpError.BadRequest('Missing id'));

  try {
    const loggedUser = parseToken(res.locals.user);
    await bookmarksService.deleteById(loggedUser.userId, postId);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default bookmarksRouter;

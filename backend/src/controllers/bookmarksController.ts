/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import bookmarksService from '../services/bookmarksService';
import { parseToken } from '../utils/parsers';
import { auth } from '../utils/middleware';
const bookmarksRouter = Router();

bookmarksRouter.post('/:id', auth.required, async (req, res, next) => {
  const { id: postId } = req.params;

  try {
    const loggedUser = parseToken(res.locals.user);
    const bookmark = await bookmarksService.bookmark(loggedUser.userId, postId);
    return res.status(201).json(bookmark);
  } catch (e) {
    return next(e);
  }
});

bookmarksRouter.get('/', auth.required, async (_req, res, next) => {
  try {
    const loggedUser = parseToken(res.locals.user);
    const bookmarks = await bookmarksService.getAll(loggedUser.userId);
    return res.status(200).json(bookmarks);
  } catch (e) {
    return next(e);
  }
});

bookmarksRouter.get('/IDs', auth.required, async (_req, res, next) => {
  try {
    const loggedUser = parseToken(res.locals.user);

    const bookmarksIDs = await bookmarksService.getIDs(loggedUser.userId);
    return res.status(200).json(bookmarksIDs);
  } catch (e) {
    return next(e);
  }
});

bookmarksRouter.delete('/:id', auth.required, async (req, res, next) => {
  const postId = req.params.id;

  try {
    const loggedUser = parseToken(res.locals.user);
    await bookmarksService.deleteById(loggedUser.userId, postId);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default bookmarksRouter;

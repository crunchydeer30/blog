/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import createHttpError = require('http-errors');

import postsService from '../services/postsService';
import commentsService from '../services/commentsService';

import { validationMiddleware } from '../validation';
import createPostDto from '../dto/createPostDto';
import CreateCommentDto from '../dto/createCommentDto';
import { parseToken } from '../utils/parsers';

const postsRouter = Router();

postsRouter.get('/', async (req, res, next) => {
  const query = req.query;

  try {
    const blogs = await postsService.getAll(query);
    return res.status(200).json(blogs);
  } catch (e) {
    return next(e);
  }
});

postsRouter.get('/following', async (req, res, next) => {
  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  const query = req.query;

  try {
    const loggedUser = parseToken(res.locals.user);
    const blogs = await postsService.getFollowing(loggedUser.userId, query);
    return res.status(200).json(blogs);
  } catch (e) {
    return next(e);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await postsService.getById(req.params.id);
    return res.status(200).json(blog);
  } catch (e) {
    return next(e);
  }
});

postsRouter.get('/:id/comments', async (req, res, next) => {
  const { id: postId } = req.params;
  if (!postId) return next(createHttpError.NotFound('Missing ID'));

  try {
    const comments = await commentsService.getByPostId(postId);
    return res.status(200).json(comments);
  } catch (e) {
    return next(e);
  }
});

postsRouter.post(
  '/',
  validationMiddleware(createPostDto),
  async (req, res, next) => {
    if (!res.locals.user)
      return next(createHttpError.Unauthorized('Not authorized'));

    try {
      const loggedUser = parseToken(res.locals.user);
      const data = req.body as createPostDto;
      console.log('Data initialized');
      
      const newBlog = await postsService.create(data, loggedUser.userId);
      console.log('Returning');
      return res.status(201).json(newBlog);
    } catch (e) {
      return next(e);
    }
  }
);

postsRouter.post(
  '/:id/comments',
  validationMiddleware(CreateCommentDto),
  async (req, res, next) => {
    if (!res.locals.user)
      return next(createHttpError.Unauthorized('Not authorized'));

    const { id: postId } = req.params;

    try {
      const loggedUser = parseToken(res.locals.user);
      const data = req.body as CreateCommentDto;

      const comment = await commentsService.create(
        data,
        postId,
        loggedUser.userId
      );
      return res.status(201).json(comment);
    } catch (e) {
      return next(e);
    }
  }
);

postsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!res.locals.user)
    return next(createHttpError.Unauthorized('Not authorized'));

  try {
    const loggedUser = parseToken(res.locals.user);
    const blog = await postsService.getById(id);
    if (blog.authorId !== loggedUser.userId)
      return next(createHttpError.Unauthorized(''));

    await postsService.deleteById(blog.id);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default postsRouter;

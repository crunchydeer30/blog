/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import createHttpError = require('http-errors');

import postsService from '../services/postsService';
import commentsService from '../services/commentsService';

import { validationMiddleware } from '../validation';
import createPostDto from '../dto/createPostDto';
import CreateCommentDto from '../dto/createCommentDto';
import { parseToken } from '../utils/parsers';
import { auth } from '../utils/middleware';

const postsRouter = Router();

postsRouter.get('/', auth.optional, async (req, res, next) => {
  const query = req.query;

  try {
    const blogs = await postsService.getAll(query);
    return res.status(200).json(blogs);
  } catch (e) {
    return next(e);
  }
});

postsRouter.get('/following', auth.required, async (req, res, next) => {
  const query = req.query;

  try {
    const loggedUser = parseToken(res.locals.user);
    const blogs = await postsService.getFollowing(loggedUser.userId, query);
    return res.status(200).json(blogs);
  } catch (e) {
    return next(e);
  }
});

postsRouter.get('/:id', auth.optional, async (req, res, next) => {
  try {
    const blog = await postsService.getById(req.params.id);
    return res.status(200).json(blog);
  } catch (e) {
    return next(e);
  }
});

postsRouter.get('/:id/comments', auth.optional, async (req, res, next) => {
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
  auth.required,
  validationMiddleware(createPostDto),
  async (req, res, next) => {
    try {
      const loggedUser = parseToken(res.locals.user);
      const data = req.body as createPostDto;      
      const newBlog = await postsService.create(data, loggedUser.userId);
      return res.status(201).json(newBlog);
    } catch (e) {
      return next(e);
    }
  }
);

postsRouter.post(
  '/:id/comments',
  auth.required,
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

postsRouter.delete('/:id', auth.required, async (req, res, next) => {
  try {
    const loggedUser = parseToken(res.locals.user);
    const blog = await postsService.getById(req.params.id);
    if (blog.authorId !== loggedUser.userId)
      return next(createHttpError.Unauthorized(''));

    await postsService.deleteById(blog.id);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default postsRouter;

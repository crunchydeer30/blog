/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import CreateTopicDto from '../dto/createTopicDto';
import { validationMiddleware } from '../validation';
import topicsService from '../services/topicsService';
import createHttpError from 'http-errors';

const topicRouter = Router();

topicRouter.get('/', async (_req, res, next) => {
  try {
    const topics = await topicsService.getAll();
    return res.status(200).json(topics);
  } catch (e) {
    return next(e);
  }
});

topicRouter.get('/:id', async (req, res, next) => {
  try {
    const topic = await topicsService.getById(req.params.id);
    return res.status(200).json(topic);
  } catch (e) {
    return next(e);
  }
});

topicRouter.post(
  '/',
  validationMiddleware(CreateTopicDto),
  async (req, res, next) => {
    if (!res.locals.user)
      return next(createHttpError.Unauthorized('Not authorized'));

    try {
      const data = req.body as CreateTopicDto;
      const newTopic = await topicsService.create(data);
      return res.status(201).json(newTopic);
    } catch (e) {
      return next(e);
    }
  }
);

export default topicRouter;

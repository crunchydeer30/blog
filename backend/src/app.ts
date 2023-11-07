import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import blogsRouter from './controllers/postsController';
import usersRouter from './controllers/usersController';
import authRouter from './controllers/authController';
import topicRouter from './controllers/topicsController';
import subscriptionRouter from './controllers/subscriptionsController';
import bookmarksRouter from './controllers/bookmarksController';
import commentsRouter from './controllers/commentsController';
import { errorHandler, extractUser } from './utils/middleware';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(extractUser);

app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/posts', blogsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/topics', topicRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/comments', commentsRouter);

app.use(errorHandler);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

export default app;

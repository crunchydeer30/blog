/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import postsService from "../services/postsService";

const searchRouter = Router();

searchRouter.get('/posts', async (req, res, next) => {
  const query = req.query;

  try {
    const result = await postsService.getAll(query);
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
});

export default searchRouter;
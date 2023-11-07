import prisma from '../db';
import { Topic } from '@prisma/client';
import CreateTopicDto from '../dto/createTopicDto';
import createHttpError from 'http-errors';

const getAll = async () => {
  const topics = await prisma.topic.findMany();
  return topics;
};

const getById = async (id: string): Promise<Topic> => {
  const topic = await prisma.topic.findUnique({
    where: {
      id,
    },
  });

  if (!topic) throw new createHttpError.NotFound('Topic not found');

  return topic;
};

const create = async (data: CreateTopicDto) => {
  const { title } = data;
  const newTopic = await prisma.topic.create({
    data: {
      title,
    },
  });

  return newTopic;
};

export default { getAll, create, getById };

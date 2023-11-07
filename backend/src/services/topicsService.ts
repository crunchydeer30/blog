import prisma from '../db';
import CreateTopicDto from '../dto/createTopicDto';

const getAll = async () => {
  const topics = await prisma.topic.findMany();
  return topics;
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

export default { getAll, create };

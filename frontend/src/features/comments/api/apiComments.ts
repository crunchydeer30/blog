import axios from 'axios';
import { HOST_NAME } from '../../../config';
import { CreateCommentInfo } from '../../posts/types';
import { generateHeaders } from '../../../utils';
import { Comment } from '../../../types';

const BASE_URL_COMMENTS = `${HOST_NAME}/api/comments`;
const BASE_URL_POSTS = `${HOST_NAME}/api/posts`;

const getAll = async (postId: string): Promise<Comment[]> => {
  const response = await axios.get(`${BASE_URL_POSTS}/${postId}/comments`);
  return response.data;
};

const create = async (postId: string, comment: CreateCommentInfo): Promise<Comment> => {
  const headers = generateHeaders();
  console.log(comment);

  const response = await axios.post(
    `${BASE_URL_POSTS}/${postId}/comments`,
    comment,
    { headers }
  );
  return response.data;
};

const deleteById = async (commentId: string): Promise<void> => {
  const headers = generateHeaders();

  const response = await axios.delete(`${BASE_URL_COMMENTS}/${commentId}`, {
    headers
  })

  return response.data;
}

export default { getAll, create, deleteById };

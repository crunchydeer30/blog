import { IsNotEmpty, MinLength } from "class-validator";
import { Comment } from "@prisma/client";


class CreateCommentDto implements Omit<Comment, 'id' | 'createdAt' | 'userId' | 'postId'> {
  @IsNotEmpty()
  @MinLength(10)
  content!: string;
}

export default CreateCommentDto;
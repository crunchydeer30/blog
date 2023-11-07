import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Post } from '@prisma/client';


class createPostDto implements Omit<Post, 'id' |'createdAt' | 'authorId'> {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(40)
  title!: string;

  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(150)
  description!: string;

  @IsNotEmpty()
  @MinLength(200)
  content!: string;

  @IsNotEmpty()
  topicId!: string;

  @IsNotEmpty()
  thumbnail!: string;

  @IsNotEmpty()
  header!: string;
}

export default createPostDto;
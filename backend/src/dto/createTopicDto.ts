import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Topic } from "@prisma/client";

class CreateTopicDto implements Omit<Topic, "id"> {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  title!: string;
}

export default CreateTopicDto;
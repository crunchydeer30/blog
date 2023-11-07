import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Topic } from "@prisma/client";

class CreateTopicDto implements Omit<Topic, "id"> {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  title!: string;
}

export default CreateTopicDto;
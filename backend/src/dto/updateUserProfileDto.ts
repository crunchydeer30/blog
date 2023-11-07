import { User } from "@prisma/client";
import { IsNotEmpty, MaxLength } from "class-validator";

class UpdateUserProfileDto implements Pick<User, 'displayName' | 'profileImage' | 'personalInfo'> {
  @IsNotEmpty()
  @MaxLength(25)
  displayName!: string;

  profileImage!: string | null;

  @MaxLength(255)
  personalInfo!: string | null;
}

export default UpdateUserProfileDto;
import { User } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

class UpdateUserProfileDto implements Pick<User, 'displayName' | 'profileImage' | 'personalInfo'> {
  @IsNotEmpty()
  displayName!: string;

  profileImage!: string | null;

  personalInfo!: string | null;
}

export default UpdateUserProfileDto;
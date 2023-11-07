import { IsNotEmpty } from "class-validator";
import { User } from "@prisma/client";


class AuthUserDto implements Pick<User, 'username' | 'password'> {
  @IsNotEmpty()
  username!: string;
  
  @IsNotEmpty()
  password!: string;
}

export default AuthUserDto;
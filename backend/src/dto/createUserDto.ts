import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from '@prisma/client';

class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'role' | 'displayName' | 'profileImage' | 'personalInfo'>
{
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  password!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export default CreateUserDto;

import { IsAlphanumeric, IsEmail } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  password: string;
}

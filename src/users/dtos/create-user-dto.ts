import { IsAlphanumeric, IsEmail, Length } from 'class-validator';
import { IsEqual } from '../../custom-decorators';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @Length(8, 32)
  password: string;

  @IsEqual('password', { message: 'Passwords must match!' })
  passwordConfirm: string;
}

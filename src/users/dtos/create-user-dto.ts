import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEqual } from '../../custom-decorators';
export class CreateUserDto {
  @IsAlpha()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @Length(8, 32)
  password: string;

  @IsEqual('password', { message: 'Passwords must match!' })
  passwordConfirm: string;
}

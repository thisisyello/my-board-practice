import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

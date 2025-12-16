import { IsString, IsNotEmpty } from 'class-validator';

export class createPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
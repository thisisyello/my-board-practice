import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @Type(() => Number)
  @IsNumber()
  postId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

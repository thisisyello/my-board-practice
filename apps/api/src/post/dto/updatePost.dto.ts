import { PartialType } from '@nestjs/mapped-types';
import { createPostDto } from './createPost.dto';

export class UpdatePostDto extends PartialType(createPostDto) {}
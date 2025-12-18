import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateCommentDto) {
    console.log('Comment Create Request:', { userId: req.user.id, dto });
    return this.commentService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Query('postId', ParseIntPipe) postId: number) {
    return this.commentService.findAll(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyComments(@Req() req) {
    return this.commentService.findMyComments(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body('content') content: string,
  ) {
    return this.commentService.update(id, req.user.id, content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.commentService.delete(id, req.user.id);
  }
}

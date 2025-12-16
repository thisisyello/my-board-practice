import { Controller, Post, Get, Body, UseGuards, Req, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createPostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: createPostDto) {
    return this.postService.create(req.user.id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @Req() req,
  ) {
    return this.postService.update(id, dto, req.user.id);
  }

  @Get()
  async findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.postService.findAll(+page, +limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findMyPosts(
    @Req() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.postService.findMyPosts(req.user.id, +page, +limit);
  }

  @Get('best')
  async findBest(@Query('limit') limit: string = '3') {
    return this.postService.findBest(+limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like')
  like(@Param('id') id: string, @Body('like') like: boolean) {
    return this.postService.like(+id, like);
  }
}
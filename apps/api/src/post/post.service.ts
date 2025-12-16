import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createPostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, dto: createPostDto) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        userId: userId,
      },
    });
  }
  async update(id: number, dto: UpdatePostDto, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if(!post) throw new NotFoundException('게시글을 찾을 수 없습니다.');
    if(post.userId !== userId) {
      throw new ForbiddenException('본인이 작성한 글만 수정할 수 있습니다.');
    }
    return this.prisma.post.update({
      where: { id },
      data: dto,
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { userName: true } } },
      }),
      this.prisma.post.count(),
    ]);

    return { posts, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findMyPosts(userId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { userName: true } } },
      }),
      this.prisma.post.count({ where: { userId } }),
    ]);

    return { posts, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: { select: { userName: true, userId: true } } },
    });
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다.');
    return post;
  }

  async like(id: number, like: boolean) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다.');

    const newLikes = like ? post.likes + 1 : Math.max(0, post.likes - 1);

    return this.prisma.post.update({
      where: { id },
      data: { likes: newLikes },
    });
  }
}
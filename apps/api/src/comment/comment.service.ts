import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        postId: dto.postId,
        userId: userId,
        createdAt: new Date(),
      },
      include: {
        user: { select: { userName: true, userId: true } },
      },
    });
  }

  async findAll(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: { userName: true, userId: true } },
      },
    });
  }

  async findMyComments(userId: number) {
    return this.prisma.comment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        post: { select: { title: true } },
      },
    });
  }
  async update(id: number, userId: number, content: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('댓글을 찾을 수 없습니다.');
    if (comment.userId !== userId) {
      throw new ForbiddenException('작성자만 수정할 수 있습니다.');
    }

    return this.prisma.comment.update({
      where: { id },
      data: { content },
    });
  }

  async delete(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('댓글을 찾을 수 없습니다.');
    if (comment.userId !== userId) {
      throw new ForbiddenException('작성자만 삭제할 수 있습니다.');
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }
}

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signup(dto: SignupDto) {
    // 중복 체크
    const existing = await this.prisma.user.findUnique({
      where: { userId: dto.userId },
    });
    if (existing) {
      throw new ConflictException('이미 사용 중인 아이디입니다');
    }
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    // 사용자 생성
    const user = await this.prisma.user.create({
      data: {
        userName: dto.userName,
        userId: dto.userId,
        password: hashedPassword,
      },
    });
    // JWT 토큰 생성
    const payload = { sub: user.id, username: user.userId };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      user: {
        id: user.id,
        userName: user.userName,
        userId: user.userId,
      },
    };
  }
  async validateUser(userId: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        userName: user.userName,
        userId: user.userId,
      },
    };
  }
  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        userId: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다');
    }
    return user;
  }
}

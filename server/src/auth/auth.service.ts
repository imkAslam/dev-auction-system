import { UsersService } from '@/users/users.service';
import { Injectable, HttpException, HttpStatus, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Utils } from '@/common/utils/utils';
import { JwtPayload } from './interface/Jwt.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
@Global()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly helper: Utils,
  ) {}

  async register(body: CreateUserDto): Promise<object> {
    const user = await this.usersService.create(body);
    const { password, ...rest } = user;
    const jwt_token = await this.createAccessToken(rest);
    return { ...rest, access_token: jwt_token };
  }

  async login(body: AuthDto): Promise<object> {
    const { email } = body;
    const user = await this.usersService.getByUserByEmail(email);

    if (!user)
      throw new HttpException('Invalid email/password', HttpStatus.NOT_FOUND);

    const decodePwd = await this.helper.decodePassword(
      body.password,
      user.password,
    );

    if (!decodePwd)
      throw new HttpException('Invalid email/password', HttpStatus.NOT_FOUND);

    const { password, ...rest } = user;
    const jwt_token = await this.createAccessToken(rest);
    return {
      status: HttpStatus.OK,
      data: { ...rest, access_token: jwt_token },
    };
  }

  public async createAccessToken(payload: JwtPayload): Promise<unknown> {
    const result = this.jwtService.sign(payload, {
      secret: process.env.JWT_KEY,
    });

    return result;
  }
}

import { HttpException, Injectable, Global } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { EMAIL_ALREADY_EXIST_RESPONSE } from '@/common/constants/http-responses.types';
import { Utils } from '@/common/utils/utils';

@Global()
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    private readonly helper: Utils,
  ) {}

  async create(body: CreateUserDto) {
    const isUser = await this.userRepo.findOne({
      where: {
        email: body.email,
      },
    });

    if (isUser)
      throw new HttpException(
        EMAIL_ALREADY_EXIST_RESPONSE.message,
        EMAIL_ALREADY_EXIST_RESPONSE.status,
      );

    const encodePwd = await this.helper.encodePassword(body.password);
    const new_user = this.userRepo.create({ ...body, password: encodePwd });
    const save_user = await this.userRepo.save(new_user);
    return save_user;
  }

  async getByUserByEmail(email: string) {
    const isUser = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });
    return isUser;
  }
}

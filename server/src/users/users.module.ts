import { Module, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Utils } from '@/common/utils/utils';
import { AuthService } from '@/auth/auth.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, Utils],
  exports: [UsersService],
})
export class UsersModule {}

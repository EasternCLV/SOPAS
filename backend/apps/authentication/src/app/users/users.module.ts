import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, JwtService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

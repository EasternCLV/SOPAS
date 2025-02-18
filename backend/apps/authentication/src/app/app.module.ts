import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {DatabaseModule} from '@backend/database'
import { GlobalExceptionFilter } from '@backend/shared';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule
  ],
  controllers: [AppController, AuthController],
  providers: [ConfigService,AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }
  ],
})
export class AppModule { }

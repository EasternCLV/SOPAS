import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception-filters/global-exception.filter';
import { ConfigService } from '@nestjs/config';
import {DatabaseModule} from '@backend/database'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'db',
    //   port: 5432, //5433 port local, 5432 port serve(docker)
    //   username: 'root',
    //   password: '130600',
    //   database: 'postgres', // coi theo db trên dbeaver
    //   entities: [
    //    User
    //   ],
    //   synchronize: true,
    //   logging: true,
    // }),
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

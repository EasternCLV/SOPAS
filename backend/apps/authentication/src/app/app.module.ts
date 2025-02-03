import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'root',
      password: '130600',
      database: 'postgres', // coi theo db trên dbeaver
      entities: [
       User
      ],
      synchronize: true,
      logging: true,
    }),
    
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppDataSource } from './typeorm.config';
@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppDataSource().options; // Trả về options từ DataSource
      },
      inject: [ConfigService], // Inject ConfigService vào
    }),
  ],
  controllers: [],
  providers: [],
  exports: [DatabaseModule],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
import typeormConfig from './typeorm.config';
@Module({
  imports:[
    ConfigModule.forRoot({
      load: [typeormConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService) => {
        const typeOrmConfig = configService.get('typeorm'); // Fetch the config by namespace
        return {
          ...typeOrmConfig,
        };
      },
      // useFactory: async (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get('typeorm.host'),
      //   port: configService.get('typeorm.port'),
      //   username: configService.get('typeorm.username'),
      //   password: configService.get('typeorm.password'),
      //   database: configService.get('typeorm.database'),
      //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //   migrations: [__dirname + '/migrations/*{.ts,.js}'],
      //   autoLoadEntities: true,
      //   synchronize: false,
      // }),
      inject: [ConfigService]
    }),
  ],
  controllers: [],
  providers: [],
  exports: [DatabaseModule],
})
export class DatabaseModule {}

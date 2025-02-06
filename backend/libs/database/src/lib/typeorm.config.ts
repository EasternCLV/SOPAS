import { registerAs } from "@nestjs/config";
export default registerAs('typeorm', () => ({
    type: 'postgres',
    host: process.env["DATABASE_HOST"],
    port: process.env["DATABASE_PORT"],
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
    database: process.env["DATABASE_NAME"],
    entities: [__dirname + '.../../../../apps/authentication/src/app/entities/*.entity{.ts,.js}'],
    // entities: [User],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    autoLoadEntities: true,
    synchronize: false,
  }));
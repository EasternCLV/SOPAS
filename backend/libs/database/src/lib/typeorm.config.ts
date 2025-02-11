import { DataSource } from "typeorm"
import {User} from "../../../../apps/entities/user.entity"
export const AppDataSource = () => {
    return new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: process.env["POSTGRES_USERNAME"],
        password: process.env["POSTGRES_PASSWORD"],
        database: process.env["POSTGRES_DB"],
        entities: [User],
        // migrations: [`${__dirname}/../../../apps/migrations/*{.ts,.js}`],
        synchronize: true,
    })
}
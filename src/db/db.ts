import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "sago-code",
    port: 5432,
    database: "kabod-style",
    entities: [path.join(__dirname, '../entities/*.entity.{ts,js}')],
    logging: true,
    synchronize: true,
})
import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "sago-code",
    port: 5432,
    database: "kabod-style",
    entities: [User],
    logging: true,
    synchronize: true,
})
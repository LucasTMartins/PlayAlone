import "reflect-metadata";
import { DataSource } from "typeorm";
import { EntityCharacter } from "./entity/EntityCharacter";
import { Item } from "./entity/Item";
import { Scene } from "./entity/Scene";
import { Place } from "./entity/Place";
import { EntityName } from "./entity/EntityName";

import dotenv from "dotenv";
dotenv.config();

const dialect = process.env.DB_DIALECT ?? "mysql";

export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres" | "mongodb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [
        EntityCharacter,
        Item,
        Scene,
        Place,
        EntityName,
    ],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
})

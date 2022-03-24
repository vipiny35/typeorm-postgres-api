import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "tick",
    synchronize: true,
    logging: false,
    entities: [
        __dirname + '/**/*.entity.{js,ts}'
    ],
    migrations: [
        __dirname + "./migration/**/*.ts"
    ],
    subscribers: [
        __dirname + "./subscriber/**/*.ts"
    ]
})

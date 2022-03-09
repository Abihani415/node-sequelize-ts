import { Sequelize } from "sequelize";

export default new Sequelize(
  (process.env.DB_NAME = "node-ts"),
  (process.env.DB_USER = "postgres"),
  (process.env.DB_PASSWORD = "password"),
  {
    port: Number(process.env.DB_PORT) || 8000,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

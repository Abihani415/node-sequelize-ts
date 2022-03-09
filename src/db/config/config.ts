interface DBConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
  port: string;
}
const db: { [key: string]: DBConfig } = {
  development: {
    username: "postgres",
    password: "password",
    database: "node-ts",
    host: "127.0.0.1",
    dialect: "postgres",
    port: "8000",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "8000",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "8000",
  },
};
const env = process.env.NODE_ENV || "development";
export = {
  [env]: db[env],
};

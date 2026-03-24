import { Sequelize } from "sequelize";
import configs from "@/configs";
import pg from "pg";

const database = configs.hosts.postgres.database as string;
const user = configs.hosts.postgres.user;
const password = configs.hosts.postgres.password;
const host = configs.hosts.postgres.host;
const port = Number(configs.hosts.postgres.port);

if (!user || !password) {
  throw new Error(
    "Usuário ou senha não definidos nas configurações do banco de dados.",
  );
}

const conn = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: "postgres",
  dialectModule: pg,
});

const connectToDatabase = async () => {
  try {
    await conn.authenticate();
    console.log("[POSTGRES] Conectado com sucesso");
  } catch (error) {
    console.error("[POSTGRES] Falha ao conectar, error: " + error);
  }
};

connectToDatabase();

export default conn;

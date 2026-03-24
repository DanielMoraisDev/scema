import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import conn from "./db/postgres";
import { router as routes } from "./routes/router";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: FRONTEND_URL, // Substitua pela URL exata do seu Vite/React
    credentials: true, // Permite o envio de cookies/headers de autenticação
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api", routes);

const inialize = async () => {
  try {
    await conn.authenticate();
    console.log("[DB][POSTGRES] Conectado com sucesso");

    await conn.sync();
    console.log("[DB][POSTGRES] Models sincronizados");

    app.listen(PORT, () => {
      console.log(`🚀 API rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("[INIT][ERROR]", error);
    process.exit(1);
  }
};

inialize();

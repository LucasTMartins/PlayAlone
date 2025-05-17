//Importar a biblioteca Express
import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";

// Criar a Aplicação Express
const router = express.Router();

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro durante a conexão com o banco de dados", error);
  });

//Criar a rota GET principal
router.get("/", (req: Request, res: Response) => {
  res.send("Bem-Vindo Pessoal!");
});

export default router;

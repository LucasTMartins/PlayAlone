//Importar das bibliotecas
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import login from "./controllers/login";

// Criar a Aplicação Express
const app = express();

app.use("/", login)

//Iniciar o servidor na porta 8080
app.listen(8080, () =>{
    console.log(`Servidor Iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
});
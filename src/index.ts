import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { AppDataSource } from "./data-source"; // ajuste o caminho conforme seu projeto

import login from "./controllers/login";
import characters from "./controllers/characters";
import names from "./controllers/names";
import items from "./controllers/items";
import places from "./controllers/places";
import scenes from "./controllers/scenes";

const app = express();

app.use(express.json());

app.use("/", login);
app.use("/characters", characters);
app.use("/names", names);
app.use("/items", items);
app.use("/places", places);
app.use("/scenes", scenes);

const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao inicializar DataSource:", error);
  });

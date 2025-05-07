// backend.js
import express from "express";
import { deployDynamicContract } from "./scripts/deployDynamic.js";

const app = express();
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const { message } = req.body;
  const result = await deployDynamicContract(message);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Servidor backend rodando em http://localhost:3000");
});

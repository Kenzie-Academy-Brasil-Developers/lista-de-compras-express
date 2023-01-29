import express, { Application } from "express";
import { createPurchaseList } from "./logic";
import { validatedBodyMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", validatedBodyMiddleware, createPurchaseList);
// app.get("/purchaseList", listPurchaseList);
app.get("/purchaseList/:id/:myName",)

app.listen(3000, () => {
  console.log("Server is running!");
});
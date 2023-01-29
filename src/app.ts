import express, { Application } from "express";
import { createPurchaseList, listOneList, listPurchaseList } from "./logic";
import { ensureListExists, validatedBodyMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", validatedBodyMiddleware, createPurchaseList);
app.get("/purchaseList", listPurchaseList);
app.get("/purchaseList/:id", ensureListExists, listOneList )


app.listen(3000, () => {
  console.log("Server is running!");
});
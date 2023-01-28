import express, { Application } from "express";
import { createShoppingList } from "./logic";
import { validateData } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", validateData, createShoppingList);
// app.get("/work-order", listWorkOrder);

app.listen(3000, () => {
  console.log("Server is running!");
});
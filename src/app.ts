import express, { Application } from "express";
import {
  createPurchaseList,
  deleteList,
  listOneList,
  listPurchaseList,
  updateList,
} from "./logic";
import { ensureListExists, validatedBodyMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", validatedBodyMiddleware, createPurchaseList);
app.get("/purchaseList", listPurchaseList);
app.get("/purchaseList/:listId", ensureListExists, listOneList);
app.patch(
  "/purchaseList/:listId/:name",
  ensureListExists,
  updateList
);
app.delete("/purchaseList/:listId", ensureListExists, deleteList);

app.listen(3000, () => {
  console.log("Server is running!");
});

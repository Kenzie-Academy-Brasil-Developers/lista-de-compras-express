import { Request, Response } from "express";
import { database } from "./dataBase";
import { v4 as uuidv4 } from "uuid";

const createShoppingList =
 ({ validatedBody }: Request, res: Response): Response =>
  { const newItem = {
    id: uuidv4(),
    ...validatedBody
  };

  database.push(newItem);

  return res.status(201).json(database);
};

export { createShoppingList };

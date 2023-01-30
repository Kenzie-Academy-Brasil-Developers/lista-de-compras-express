import { Request, Response } from "express";
import { database } from "./dataBase";
import { IList } from "./interfaces";

const createPurchaseList = (
  { validatedBody }: Request,
  res: Response
): Response => {
  const dataBaseLength = database.length;

  const newItem: IList = {
    id: dataBaseLength + 1,
    ...validatedBody,
  };

  database.push(newItem);

  return res.status(201).json(newItem);
};

const listPurchaseList = (req: Request, resp: Response): Response => {
  return resp.status(200).json(database);
};

const listOneList = ({ findListIndex }: Request, resp: Response): Response => {
  return resp.status(200).json(database[findListIndex]);
};

const updateList = (
  { validatedBody, findListIndex }: Request,
  resp: Response
): Response => {
  database[findListIndex] = { ...database[findListIndex], ...validatedBody };

  return resp.status(200).json(database[findListIndex]);
};

export const deleteList = (
  { findListIndex }: Request,
  resp: Response
): Response => {
  database.splice(findListIndex, 1);

  return resp.status(204).json();
};

export { createPurchaseList, listPurchaseList, listOneList, updateList };

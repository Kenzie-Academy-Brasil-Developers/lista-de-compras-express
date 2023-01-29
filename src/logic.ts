import { Request, Response } from "express";
import { database } from "./dataBase";
import { IList } from "./interfaces";

const createPurchaseList = (
  { validatedBody }: Request,
  res: Response
): Response => {
  const newItem: IList = {
    id: new Date().getTime(),
    ...validatedBody,
  };

  database.push(newItem);

  return res.status(201).json(newItem);
};

const listPurchaseList = (req: Request, resp: Response): Response => {
  return resp.status(200).json(database)
}

const listOneList = ({findListIndex}: Request, resp: Response): Response => {
  return resp.status(200).json(database[findListIndex])
}

export { createPurchaseList, listPurchaseList, listOneList };

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

const updateList = (req: Request, resp: Response): Response => {
  const { listId, name } = req.params;
  let indexList = 0;
  let list = database.find((el, index) => {
    if (el.id == parseInt(listId)) {
      indexList = index;
      return true;
    }
    return false;
  }) as IList;

  const { data } = list;

  let indexProd = 0;
  const prod = data.find((el, index) => {
    if (el.name === name) {
      indexProd = index;
      return true;
    }
    return false;
  });

  if (!prod) {
    return resp.status(404).json("Not found product");
  }

  list.data[indexProd] = { ...prod, ...req.body };
  database[indexList] = list;

  return resp.status(200).json(list);
};

const deleteList = ({ findListIndex }: Request, resp: Response): Response => {
  database.splice(findListIndex, 1);

  return resp.status(204).json();
};

const deleteItem = (req: Request, resp: Response): Response => {
  const { listId, name } = req.params;
  let indexList = 0;
  let list = database.find((el, index) => {
    if (el.id == parseInt(listId)) {
      indexList = index;
      return true;
    }
    return false;
  }) as IList;

  list.data = list.data.filter((item) => item.name !== name);

  database[indexList] = list;

  return resp.status(204).json();
};

export {
  createPurchaseList,
  listPurchaseList,
  listOneList,
  updateList,
  deleteList,
  deleteItem,
};

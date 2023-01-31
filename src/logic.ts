import { Request, Response } from "express";
import { database } from "./dataBase";
import { IList } from "./interfaces";

let increment = 1;

const createPurchaseList = (
  { validatedBody }: Request,
  res: Response
): Response => {
  const newItem: IList = {
    id: increment++,
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
  let listForId = database.find((list, index) => {
    if (list.id == parseInt(listId)) {
      indexList = index;
      return true;
    }
    return false;
  }) as IList;

  const { data } = listForId;

  let indexItem = 0;
  const item = data.find((el, index) => {
    if (el.name === name) {
      indexItem = index;
      return true;
    }
    return false;
  });

  if (!item) {
    return resp.status(404).json(`Item with name ${name} does not exist`);
  }

  listForId.data[indexItem] = { ...item, ...req.body };
  database[indexList] = listForId;

  return resp.status(200).json(listForId);
};

const deleteList = ({ findListIndex }: Request, resp: Response): Response => {
  database.splice(findListIndex, 1);

  return resp.status(204).json();
};

const deleteItem = (req: Request, resp: Response): Response => {
  const { listId, name } = req.params;
  let indexList = 0;
  let listForId = database.find((list, index) => {
    if (list.id == parseInt(listId)) {
      indexList = index;
      return true;
    }
    return false;
  }) as IList;

  const validateItem = listForId.data.filter((item) => item.name === name)
  
  if (validateItem.length <= 0) {
    return resp.status(404).json(`Item with name ${name} does not exist`);
  }

  listForId.data = listForId.data.filter((item) => item.name !== name);

  database[indexList] = listForId;

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

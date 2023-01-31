import { NextFunction, Request, Response } from "express";
import { database } from "./dataBase";
import { IData, IrequeridKeys, IrequeridKeysData } from "./interfaces";

const validatedBodyMiddleware = (
  req: Request,
  resp: Response,
  next: NextFunction
): Response | void => {
  const keys: Array<string> = Object.keys(req.body);
  const keysValue: Array<string> = Object.values(req.body);
  const keysDataArray: Array<IData> = req.body.data;

  const requiredKeys: Array<IrequeridKeys> = ["listName", "data"];
  const requiredKeysData: Array<IrequeridKeysData> = ["name", "quantity"];

  let validatedKeys: boolean = requiredKeys.every((key: string) =>
    keys.includes(key)
  );

  if (!validatedKeys) {
    return resp
      .status(400)
      .json({ message: `Required fields are:${requiredKeys}` });
  }

  if (typeof keysValue[0] !== "string") {
    return resp
      .status(400)
      .json({ message: "The list name need to be a string" });
  }

  let lengthDataItem = 0;
  let typeOfDataItem = "";

  const validateData = keysDataArray.every((item) => {
    const keysData = Object.keys(item);
    lengthDataItem = keysData.length;
    const name = typeof item.name;
    const quantity = typeof item.quantity;

    if (name !== "string" || quantity !== "string") {
      typeOfDataItem = "false";
    }

    return requiredKeysData.every((key: string) => keysData.includes(key));
  });

  if (typeOfDataItem === "false") {
    return resp
      .status(400)
      .json({ message: "The name or quantity need to be a string" });
  }

  if (!validateData) {
    return resp
      .status(400)
      .json({ message: `Required fields are:${requiredKeysData}` });
  }

  if (lengthDataItem > 2 || lengthDataItem <= 0) {
    return resp
      .status(400)
      .json({ message: `Required fields are:${requiredKeysData}` });
  }

  const { listName, data } = req.body;

  req.validatedBody = {
    listName,
    data,
  };

  next();
};

const ensureListExists = (
  req: Request,
  resp: Response,
  next: NextFunction
): Response | void => {
  const { listId } = req.params;

  const findList: number = database.findIndex(
    (list) => list.id === Number(listId)
  );

  if (findList === -1) {
    return resp
      .status(404)
      .json({ message: `List with id ${listId} does not exist` });
  }

  req.findListIndex = findList;

  next();
};

export { validatedBodyMiddleware, ensureListExists };

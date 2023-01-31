import { NextFunction, Request, Response } from "express";
import { database } from "./dataBase";
import { IData, IrequeridKeys, IrequeridKeysData } from "./interfaces";

const validatedBodyMiddleware = (
  req: Request,
  resp: Response,
  next: NextFunction
): Response | void => {
  const keys: Array<string> = Object.keys(req.body);
  const keysData: Array<IData> = req.body.data;

  const requiredKeys: Array<IrequeridKeys> = ["listName", "data"];
  const requiredKeysData: Array<IrequeridKeysData> = ["name", "quantity"];

  const keysDataArray = keysData.map((item) => Object.keys(item));

  const keyVerifica: string[] | undefined = keysDataArray.find(
    (key) => key !== requiredKeysData
  );

  const verificaArray = keyVerifica === requiredKeysData;

  let validatedKeys: boolean = requiredKeys.every((key: string) =>
    keys.includes(key)
  );

  if (!validatedKeys) {
    return resp
      .status(400)
      .json({ message: `Required fields are:${requiredKeys}` });
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

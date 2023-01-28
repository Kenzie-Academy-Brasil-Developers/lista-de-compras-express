import { Request, Response, NextFunction } from "express";
import { IrequeridKeys, IrequeridKeysData } from "./interfaces";

const validateData = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const keys: Array<string> = Object.keys(req.body);
  const requeridKeys: Array<IrequeridKeys> = ["listName", "data"];
  const requeridKeysData: Array<IrequeridKeysData> = ["name", "quantity"];

  const validateKeys: boolean = requeridKeys.every((key: string) =>
    keys.includes(key)
  );

  if (!validateKeys) {
    return res
      .status(400)
      .json({ message: `Invalid input - expected ${requeridKeys}` });
  }

  const { listName, data } = req.body;

  req.validatedBody = {
    listName,
    data,
  };

  return next();
};

export { validateData };

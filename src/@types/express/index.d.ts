import * as express from "express";
import { IData } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      validatedBody: {
        listName: string;
        data: IData[];
      };
      findListIndex: number;
    }
  }
}

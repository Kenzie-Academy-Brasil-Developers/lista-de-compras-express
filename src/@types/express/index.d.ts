import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody: {
        listName: string;
        data: string;
      };
      findListIndex: number;
    }
  }
}

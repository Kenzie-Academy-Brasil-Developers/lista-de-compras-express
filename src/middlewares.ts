import { NextFunction, Request, Response } from "express"
import { database } from "./dataBase";
import { IrequeridKeys, IrequeridKeysData } from "./interfaces";
 

const validatedBodyMiddleware = (req: Request, resp: Response, next: NextFunction): Response | void => {

  const keys: Array<string> = Object.keys(req.body)
  const requiredKeys: Array<IrequeridKeys> = ["listName", "data"]
  const requiredData: Array<IrequeridKeysData> = ["name", "quantity"]

  let validatedKeys: boolean = requiredKeys.every((key: string) => keys.includes(key)) 

  if(req.method === "PATCH"){
    validatedKeys = requiredKeys.some((key: string) => keys.includes(key)) 
    req.body = {...database[req.findListIndex], ...req.body}
  }

  if(!validatedKeys){
    return resp.status(400).json({message: `Required fields are: ${requiredKeys}`})
  }

  // if(!requiredData.includes(req.body.data)){
  //   return resp.status(400).json({message:`Required fields are: ${requiredData}` })
  // }

  const { listName, data } = req.body

  req.validatedBody = {
    listName,
    data
  }

  next()
}

export {validatedBodyMiddleware}
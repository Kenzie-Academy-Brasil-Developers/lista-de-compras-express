interface IDateRequest {
  listName: string;
  data: IData[];
}

interface IList extends IDateRequest {
  id: number;
}

export interface IData {
  name: string;
  quantity: string;
}

type IrequeridKeys = "listName" | "data";

type IrequeridKeysData = "name" | "quantity";

export { IDateRequest, IList, IrequeridKeys, IrequeridKeysData };

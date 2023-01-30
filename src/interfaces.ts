interface IDateRequest {
  listName: string;
  data: IData[];
}

interface IList extends IDateRequest {
  id: number;
}

interface IData {
  name: string;
  quantity: string;
}

type IrequeridKeys = "listName" | "data";

type IrequeridKeysData = "name" | "quantity";

export { IDateRequest, IList, IData, IrequeridKeys, IrequeridKeysData };

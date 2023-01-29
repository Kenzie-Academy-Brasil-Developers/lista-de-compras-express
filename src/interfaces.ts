interface IDateRequest {
  listName: string;
  data: string;
}

interface IList extends IDateRequest {
  id: number;
}

type IrequeridKeys = "listName" | "data";

type IrequeridKeysData = "name" | "quantity";

export { IDateRequest, IList, IrequeridKeys, IrequeridKeysData };

interface IDateRequest {
  listName: string;
  data: string;
}

interface IItemId extends IDateRequest {
  id: string;
}

type IrequeridKeys = "listName" | "data";

type IrequeridKeysData = "name" | "quantity";

export { IDateRequest, IItemId, IrequeridKeys, IrequeridKeysData };

import { clear } from "idb-keyval";

export const clearAllStores = async () => {
  await clear();
};

import { type StoreGeneric, type _StoreWithActions } from "pinia";

export function storeActions<S extends StoreGeneric>(
  store: S,
): _StoreWithActions<S> {
  return store;
}

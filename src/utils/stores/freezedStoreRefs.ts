import { toRaw } from "vue";
import { type StoreGeneric, storeToRefs } from "pinia";

export function freezedStoreRefs<S extends StoreGeneric>(store: S) {
  const refs = storeToRefs(store);
  const frozen = {} as {
    [K in keyof typeof refs]: Readonly<(typeof refs)[K]>;
  };

  for (const key in refs) {
    frozen[key as keyof typeof refs] = toRaw(refs[key]);
  }

  return frozen;
}

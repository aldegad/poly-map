import { type Ref, toRaw } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function freezeStoreRefs<T extends Record<string, Ref<any>>>(
  refs: T,
): { [K in keyof T]: Readonly<T[K]> } {
  const frozen = {} as { [K in keyof T]: Readonly<T[K]> };

  for (const key in refs) {
    frozen[key as keyof T] = toRaw(refs[key]);
  }

  return frozen;
}

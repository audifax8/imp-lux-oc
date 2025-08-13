import { useMemo } from 'react';
import { StoreApi, UseBoundStore, useStore } from 'zustand';

type Use<S> = S extends { getState: () => infer T }
  ? <K extends keyof T>(key: K) => [T[K], (value: T[K] | ((prevState: T[K]) => T[K])) => void]
  : never;

/**
 * Creates a hook to handle an specific part of the store state using the `useState` API,
 * with a getter and a setter as an array.
 *
 * Useful when the store is part of a context, so a hook can be created to wrap this one (eg `useConfigureState()`).
 * When the store is global, it's easier to use `createStoreStateHook`.
 *
 * Example:
 * ```
 * const [flag, setFlag] = useStoreStateHook(someStore, 'flagProp');
 * console.log('flag value is %s', flag);
 * setFlag(false);
 * ```
 *
 * @param store Zustand store
 * @param key name of a prop in the store state
 * @returns The getter and setter for that property
 */
export function useStoreStateHook<TStore, TKey extends keyof TStore>(store: StoreApi<TStore>, key: TKey) {
  const getter = useStore(store, (state) => state[key]);
  // const getter = store((state) => state[key]);
  const setter = useMemo(() => storeSetter(store, key), [store, key]);

  return [getter, setter] as const;
}

/**
 * Receives a store and returns a function that works exactly as `useStoreState`, but only using a key, as the store
 * is bound.
 *
 * Useful when the store is global, so the function can be created and exported right after the store.
 * @param store Zustand store
 */
export function createStoreStateHook<TStore, TKey extends keyof TStore = keyof TStore>(
  store: UseBoundStore<StoreApi<TStore>>
) {
  return (useStoreStateHook<TStore, TKey>).bind(undefined, store) as Use<UseBoundStore<StoreApi<TStore>>>;
}

/**
 * Creates a setter for a specific key of the store
 */
export function storeSetter<TStore, TKey extends keyof TStore>(store: StoreApi<TStore>, key: TKey) {
  const setter = (partial: TStore[TKey] | ((prevState: TStore[TKey]) => TStore[TKey]), merge = false) => {
    const prevNestedState = store.getState()[key];
    const newPartial = partial instanceof Function ? partial(prevNestedState) : partial;
    const newNestedState: TStore[TKey] = merge ? { ...prevNestedState, ...newPartial } : newPartial;
    const prevState = store.getState();
    const newState: TStore = { ...prevState, [key]: newNestedState };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store as any).setState(newState, false, { type: `Set ${key.toString()}`, payload: newPartial });
  };

  return setter;
}

import { IConfigureAPI, IProduct } from '@/declarations/interfaces';

import { apis } from '@/libs/lazyimport';
import { useConfigureState } from '@/libs/yr-react/store/ConfigureStore';

/**
 * Returns the ConfigureAPI instance
 *
 * @param allowUndefined optional. If true, when called before configure is created, `undefined` is returned.
 * If false (default), an error is thrown in that case.
 */
export function useConfigure(opts?: { allowUndefined: false }): IConfigureAPI;
export function useConfigure(opts?: { allowUndefined: true }): IConfigureAPI | undefined;
export function useConfigure(opts?: { allowUndefined: boolean }): IConfigureAPI | undefined;
export function useConfigure(opts?: { allowUndefined: boolean }): IConfigureAPI | undefined {
  const configure = apis.configureCore;
  const allowUndefined = opts?.allowUndefined ?? false;

  if (!configure && !allowUndefined) throw new Error('Cannot call useConfigure before it is loaded');
  return configure;
}

export function useApiready(): boolean {
  const [apiReady] = useConfigureState('apiReady');
  return apiReady;
}

/**
 * Hook to get the current product.
 * It will never be updated once the product has been loaded
 */
export function useGetProduct(): IProduct {
  const configure = apis.configureCore;
  return configure?.getProduct();
}

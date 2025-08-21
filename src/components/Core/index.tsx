import { apis } from '@/libs/apis';

import { IConfigureAPI, IConfigureInitParams } from '@/declarations/interfaces';
import { CDN_FLUID_BASE_URL } from '@/declarations/constants';

import { setAPIReady } from '@/libs/yr-react/store/ConfigureStore';
import { setShowSkeleton } from '@/store/UIStore';

const promiseCache = new Map();
const cacheKey = 'core';

export function createCorePromise(params: IConfigureInitParams): Promise<IConfigureAPI | null> {
  return new Promise((resolve) => {
    if (promiseCache.has(cacheKey)) {
      return resolve(promiseCache.get(cacheKey));
    }
    const { workflow, customer, product, locale, yrEnv } = params;
    const graph = `${CDN_FLUID_BASE_URL}/static/configs/3.13.0/prod/${workflow}/${customer}/product/${product}/graph-settings-${locale}.json`
    const pref = `${CDN_FLUID_BASE_URL}/static/configs/3.13.0/prod/${workflow}/${customer}/preferences.json`;
    Promise.all([
      fetch(pref), 
      fetch(graph)
    ])
    .then(async ([prefResponse, graphResponse]) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const createCore = await require('@cfg.plat/configure-core');
      if (!prefResponse.ok || !graphResponse.ok) {
        if (yrEnv) {
          console.log('Error loading graph or settings JSONs');
        }
        promiseCache.set(cacheKey, null);
        return resolve(null);
      }
      const productGraph = await graphResponse.json();
      const preferences = await prefResponse.json();

      createCore(
        {
          productGraph,
          preferences,
          shouldSkipCache: false,
          product,
          customer,
          workflow
        },
        (error: Error, configureCore: IConfigureAPI) => {
          if (error) {
            if (yrEnv) {
              console.log('Error');
              console.log(error);
            }
            promiseCache.set(cacheKey, null);
            resolve(null);
          }
          apis.initLuxApi(configureCore);
          setAPIReady(true);
          setShowSkeleton(false);
          promiseCache.set(cacheKey, configureCore);
          return resolve(configureCore);
        }
      );
    }).catch(() => {
      promiseCache.set(cacheKey, null);
      resolve(null);
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function coreResource(promise: any) {
  let status = 'pending';
  let result: IConfigureAPI | null = null;

  const suspender = promise.then(
    (r: IConfigureAPI) => {
      status = 'success';
      result = r;
      return { result, status };
    },
    (e: null) => {
      status = 'error';
      result = e;
      return { result: null, status };
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      }
      return result;
    },
  };
};

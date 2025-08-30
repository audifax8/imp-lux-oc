import { apis } from '@/libs/apis';

import { IConfigureAPI, IConfigureInitParams } from '@/declarations/interfaces';
import { CDN_FLUID_BASE_URL } from '@/declarations/constants';

import { setAPIReady } from '@/libs/yr-react/store/ConfigureStore';
import { setCasToRender, setShowSkeleton, setTokenAndImage } from '@/store/UIStore';
import { startAPIs } from '@/store/APIsStore';

export function waitForCoreReady(): Promise<IConfigureAPI | null> {
  if (apis.configureCore) {
    return new Promise<IConfigureAPI | null>((resolve) => resolve(apis.configureCore));
  }
  const checkTimeMs: number = 100;
  const timeOutMs: number = 20000;
  let elapsedTime = 0;
  let isInitialized: boolean | unknown = false;

  return new Promise((resolve) => {
    const time = setInterval(() => {
      elapsedTime += checkTimeMs;
      isInitialized = apis.configureCore;
      if (isInitialized) {
        resolve(apis.configureCore);
        clearInterval(time);
      } else if (elapsedTime > timeOutMs && !isInitialized) {
        resolve(null);
        clearInterval(time);
      }
    }, checkTimeMs);
  });
};

export function core(
  params: IConfigureInitParams
): Promise<IConfigureAPI | null> {
  return new Promise((resolve) => {
    if (apis.configureCore) {
      return resolve(apis.configureCore);
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
            return resolve(null);
          }
          return resolve(configureCore);
        }
      );
    }).catch(() => {
      return resolve(null);
    });
  });
}

export function createCorePromise(
  params: IConfigureInitParams
): Promise<IConfigureAPI | null> {
  if (apis.configureCore) {
    return new Promise<IConfigureAPI | null>((resolve) => resolve(apis.configureCore));
  }
  return new Promise((resolve) => {
    if (apis.configureCore) {
      return resolve(apis.configureCore);
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
            return resolve(null);
          }
          apis.initLuxApi(configureCore);
          setCasToRender(apis.luxAPI.mapCas());
          const recipe = configureCore.getRecipe('human');
          const token = apis.luxAPI.getToken();
          const img = apis.getImg();
          /*fetch(img)
            .then(async (r) => {
              console.log(r);
              const t = await r.bytes();
              console.log(t);
              setAPIReady(true, recipe);
              setShowSkeleton(false);
              setTokenAndImage(token, img);
              startAPIs(configureCore);
              //promiseCache.set(cacheKey, configureCore);
              import('../styles/base/fonts.scss');
              return resolve(configureCore);
            })
            .catch((e) => {
              if (params.yrEnv) {
                console.log({e});
              }
            });*/
          setAPIReady(true, recipe);
          setShowSkeleton(false);
          setTokenAndImage(token, img);
          startAPIs(configureCore);
          import('../styles/base/fonts.scss');
          return resolve(configureCore);
        }
      );
    }).catch(() => {
      return resolve(null);
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function coreResource(promise: any)  {
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

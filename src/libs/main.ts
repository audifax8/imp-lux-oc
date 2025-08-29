import { preload, PreloadOptions } from 'react-dom';

import {
  IConfigureAPI,
  IConfigureInitParams,
  IRTRBaseAPI
} from '@/declarations/interfaces';

import { core } from './core';
import { rtrLoadedPromise } from './rtr';
import { apis } from './apis';
import { RtrAPI } from './apis/rtr-api';
import { startInitialStore } from '@/store/UIStore';
import { startAPIs, startAPIsInitialStore } from '@/store/APIsStore';

export type IMainAPIs = {
  core: IConfigureAPI | null,
  rtr: IRTRBaseAPI | null
};

export type ISuspender = {
  read(): IMainAPIs;
};

const getCookie = (cookieKey: string) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const cooKeyValue = cookie.split('=');
    if (cooKeyValue[0].replace(' ', '') === cookieKey) {
      try {
        return JSON.parse(cooKeyValue[1]);
      } catch {
        return cooKeyValue[1];
      }
    }
  }
};

const isRTREnabled = (
  configureCore: IConfigureAPI,
  params: IConfigureInitParams
) => {
  const { yrEnv } = params;

  const rtrCookie = getCookie('rtr-exp');
  if (rtrCookie !== undefined) {
    if (yrEnv) {
      console.info(`RTR: ${rtrCookie ? 'enabled' : 'disabled'} by cookie`);
    }
    return rtrCookie;
  }

  //if (rtrDisabled !== undefined) { return rtrDisabled }

  const product = configureCore.getProduct();
  const productFacets = product.facets;
  const rtrFacet = productFacets.RTR_VIEWER;
  if (!rtrFacet || rtrFacet[0] !== 'ENABLED') {
    if (yrEnv) {
      console.info(`RTR: disabled by product facet`);
    }
    return false;
  }
  return true;
};

export async function startInitialStores(
  configureCore: IConfigureAPI,
  params: IConfigureInitParams,
  rtr?: IRTRBaseAPI
) {
  const { yrEnv } = params;
  let isTokenValid = false;
  apis.initLuxApi(configureCore);
  startAPIs(configureCore);
  const configureImg = apis.luxAPI.getProductImg('LUX-Ray-Ban-8taOhSR5AFyjt9tfxU');

  const options: PreloadOptions = {
    as: 'image',
    fetchPriority: 'high'
  };
  if (yrEnv) {
    console.info('preload resource: ' + configureImg);
  }
  preload(configureImg, options);

  const token = apis.luxAPI.getToken();
  const casToRender = apis.luxAPI.mapCas();
  startInitialStore(token, configureImg, casToRender, false);

  const rtrEnabled = isRTREnabled(configureCore, params);
  if (rtr) {
    const rtrAPI = new RtrAPI(window.rtrViewerMV as IRTRBaseAPI);
    apis.initRTRAPI(rtrAPI);
    isTokenValid = await apis.rtrAPI.isIdAvailable(token);
    const rtrAPIReady = rtr ? true : false;
    const rtrError = !isTokenValid ? 'Invalid token' : '';
    startAPIsInitialStore(rtrEnabled, rtrAPIReady, isTokenValid, rtrError);
    apis.rtrAPI.handleTokenChange(token);
  }
  import('../styles/base/fonts.scss');
}

export async function mainResourcesPromise(
  params: IConfigureInitParams
): Promise<IMainAPIs> {
  return new Promise((resolve) => {
    try {
      const { rtrDisabled } = params;

      let coreAPI: IConfigureAPI;
      let rtrAPI: IRTRBaseAPI;

      if (rtrDisabled) {
        Promise.all([
          core(params)
        ])
        .then(async ([core]) => {
          if (core) {
            coreAPI = core;
          }
          startInitialStores(coreAPI, params);
          return resolve({ core: coreAPI, rtr: null});
        });
      } else {
        Promise.all([
          core(params),
          rtrLoadedPromise(params)
        ])
        .then(async ([core, rtr]) => {
          if (core) {
            coreAPI = core;
          }

          if (rtr) {
            rtrAPI = rtr;
          }
          startInitialStores(coreAPI, params, rtrAPI);
          return resolve({ core: coreAPI, rtr: rtrAPI });
        });
      }

    } catch (e) {
      if (params.yrEnv) {
        console.log(e);
      }
      return resolve({ core: null, rtr: null});
    }
  });
};

export function mainSuspender(promise: Promise<IMainAPIs>): ISuspender {
  let status = 'pending';
  let result: IMainAPIs;

  const suspender = promise.then(
    (r: IMainAPIs) => {
      status = 'success';
      result = r;
      return { result, status };
    },
    (e: IMainAPIs) => {
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
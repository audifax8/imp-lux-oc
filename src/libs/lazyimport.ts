import React from 'react';
import { core } from './core';
import { downloadScript, getInitQueryParams } from './helpers';
import { IConfigureAPI, IConfigureInitParams } from '@/declarations/interfaces';
import { preconnect, PreconnectOptions, preload, PreloadAs, PreloadOptions } from 'react-dom';
import { getURLsToPreconnect, mapURLs, RTR_URL } from '@/declarations/constants';
import { startInitialStore } from '@/store/UIStore';
import { APIs } from './apis';
import { ComponentType } from '@/declarations/enums';

const params = getInitQueryParams() as IConfigureInitParams;

getURLsToPreconnect(params).forEach((url: string) => {
  if (params.yrEnv) {
    console.info('preconnecting resource: ' + url);
  }
  const options: PreconnectOptions = {
    crossOrigin: 'anonymous',
  };
  preconnect(url, options);
});

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
mapURLs(params).forEach((resource) => {
  const { url } = resource;
  const options: PreloadOptions = {
    as: resource.as as PreloadAs,
    crossOrigin: resource.crossOrigin as CrossOrigin,
    fetchPriority: resource.fetchPriority
  };
  if (params.yrEnv) {
    console.info('preload resource: ' + url);
  }
  return preload(url, options);
});

export const apis = new APIs();
apis.setParams(params);

const { yrEnv, rtrDisabled } = params;
if (yrEnv && !rtrDisabled) {
  console.log(`Downloading RTR script ${RTR_URL}`);
}
if (!rtrDisabled) {
  downloadScript(RTR_URL);
}

let promise: Promise<IConfigureAPI | null> | null = null;
export function loadOnce(params: IConfigureInitParams): Promise<IConfigureAPI | null> {
  if (!promise) {
    promise = new Promise((resolve) => {
      core(params)
        .then(async (configureCore) => {
          if (configureCore) {
            if (params.yrEnv) {
              window._configure = configureCore;
            }
            const viewName = configureCore.getProduct().defaultViewName;
            import('../styles/base/fonts.scss');
            apis.initLuxApi(configureCore);
            const configureImg = apis.luxAPI.getProductImg(
              viewName
            );
            const options: PreloadOptions = {
              as: 'image',
              fetchPriority: 'high'
            };
            if (params.yrEnv) {
              console.info('preload resource: ' + configureImg);
            }
            preload(configureImg, options);
            const token = apis.luxAPI.getToken();
            const cas = apis.luxAPI.mapCas()
            const imgs = apis.luxAPI.mapConfigureImgs(
              viewName
            );
            startInitialStore(
              token,
              '',
              cas,
              false,
              false,
              imgs,
              configureCore.getProduct().defaultViewName
            );
            apis.initAssetsWorkers();
            apis.initRTRAPI();
            resolve(configureCore);
          }
        })
        .catch(e => {
          if (params.yrEnv) {
            console.error(e);
          }
          resolve(null);
        });
    });
  }

  return promise;
}

export function createLazyComponent(type: ComponentType, params: IConfigureInitParams) {
  const importer = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const componentsMap: { [key: string]: any } = {
      'MODEL' : import('../components/model/model'),
      'MENU': import('../components/menu/accordion'),
      'HEADER': import('../components/header/header'),
      'FOOTER': import('../components/footer/footer')
    };
    return componentsMap[type];
  };

  return React.lazy(() =>
    loadOnce(params).then(() => importer())
  );
}

export const LazyModel = createLazyComponent(ComponentType.model, params);
export const LazyMenu = createLazyComponent(ComponentType.menu, params);
export const LazyHeader = createLazyComponent(ComponentType.header, params);
export const LazyFooter = createLazyComponent(ComponentType.footer, params);
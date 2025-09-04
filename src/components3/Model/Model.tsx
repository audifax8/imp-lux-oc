import { use, useEffect } from 'react';
import clsx from 'clsx';

import { useRTRAPIReady, useRTRDisabled, useRTRError } from '@/state/rtr';
import { useIsCustomizerOpen, useToken } from '@/state/ui';

import { startAPIs } from '@/store/APIsStore';
import { setShowSkeleton, setTokenAndImage } from '@/store/UIStore';

import { apis } from '@/libs/lazyimport';

import { IConfigureAPI } from '@/declarations/interfaces';
import { CDN_FLUID_BASE_URL, getSkeletonURL } from '@/declarations/constants';
import { getImgData } from '@/libs/helpers';

import './index.scss';

const createCorePromise = new Promise((resolve) => {
  const params = apis?.getParams();
  if (!params) {
    return;
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
      if (params.yrEnv) {
        console.log('Error loading graph or settings JSONs');
      }
      return resolve(false);
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
          if (params.yrEnv) {
            console.log('Error');
            console.log(error);
          }
          return resolve(false);
        }
        apis.initLuxApi(configureCore);
        const configureImg = apis.luxAPI.getProductImg('LUX-Ray-Ban-8taOhSR5AFyjt9tfxU');
        fetch(configureImg)
          .then(() => {
            const token = apis.luxAPI.getToken();
            //setAPIReady(true);
            setTokenAndImage(token, configureImg);
            setShowSkeleton(false);
            startAPIs(configureCore);
            return resolve(configureImg);
          })
          .catch((e) => {
            if (yrEnv) {
              console.log({ e });
            }
            resolve(false);
          });
      }
    );
  }).catch(() => resolve(false));
});

export default function Model() {  
  const configureImg = use(createCorePromise) as string;
  if (configureImg) {
    import('../../styles/base/fonts.scss');
  }
  const [, setIsCustomizerOpen] = useIsCustomizerOpen();
  const img = configureImg ? configureImg : getSkeletonURL();
  const [rtrAPIReady] = useRTRAPIReady();
  const [token] = useToken();
  const imageData = getImgData();
  const [rtrDisabled] = useRTRDisabled();
  const [rtrError] = useRTRError();

  useEffect(() => {
    if (rtrDisabled) {
      return;
    }
    if (rtrAPIReady && token) {
      apis.rtrAPI?.init(token);
    }
  }, [rtrDisabled, rtrAPIReady, token, rtrError]);

  return (img && 
    <section className='yr-model'>
      <div id='viewer' className={clsx('yr-model__rtr', { 'yr-model__hidden': !rtrAPIReady })}></div>
      <picture
        className={clsx('yr-model__placeholder', 'yr-image', { 'yr-model__hidden': rtrAPIReady })}
        onClick={() => setIsCustomizerOpen()}>
          <img
            fetchPriority='high'
            src={img}
            alt='Model'
            height={imageData.dimentions.height}
            width={imageData.dimentions.width}
          />
      </picture>
    </section>
  );
}
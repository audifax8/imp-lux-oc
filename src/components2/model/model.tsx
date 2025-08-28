import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { apis } from '@/libs/apis';

import {
  useConfigureImg,
  useIsCustomizerOpen,
  useParams,
  useToken
} from '@/state/ui';

import {
  useRTRAPIReady,
  useRTRError
} from '@/state/rtr';

import {
  IConfigureAPI,
  IRTRBaseAPI
} from '@/declarations/interfaces';

import { getImgData } from '@/libs/helpers';

import './model.scss';
import { getSkeletonURL } from '@/declarations/constants';

type ISuspender = {
  read(): IRTRBaseAPI | IConfigureAPI | null;
};
export type IModelProps = {
  corePromise: ISuspender; 
};

export default React.memo(function Model({ corePromise }: IModelProps) {
  const r = corePromise.read();
  const [rtrStarted, setRTRStarted] = useState(false);
  const [token] = useToken();
  const [params] = useParams();
  const [rtrError] = useRTRError();
  const [rtrAPIReady] = useRTRAPIReady();
  const [isCustomizerOpen, setIsCustomizerOpen] = useIsCustomizerOpen();
  const imageData = getImgData();
  const [img] = useConfigureImg();
  const skeletonURL = getSkeletonURL();

  useEffect(() => {
    if (params.rtrDisabled) {
      return;
    }
    if (rtrError) {
      if (params.yrEnv) {
        console.log('RTR turned off due to internal error');
      }
      apis.rtrAPI.dispose();
      return;
    }
    if (rtrAPIReady && token && rtrStarted) {
      apis.rtrAPI.setId(token);
    }
    if (rtrAPIReady && token && !rtrStarted) {
      apis.rtrAPI?.init(token);
      setRTRStarted(true);
    }
  }, [params.rtrDisabled, rtrAPIReady, token, rtrError, rtrStarted, r]);

  return ( 
    <>
      {(!rtrError && !params.rtrDisabled) &&
        <div
          id='viewer'
          className={clsx('yr-model__rtr')}
        ></div>
      }
      {(rtrError || params.rtrDisabled) &&
        <picture
          className={clsx('yr-model__placeholder yr-image')}
          onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          >
            <img
              fetchPriority='high'
              src={img || skeletonURL}
              alt='Model'
              height={imageData.dimentions.height}
              width={imageData.dimentions.width}
            />
        </picture>
      }
    </>
  );
});

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { apis } from '@/libs/apis';

import {
  useConfigureImg,
  useIsCustomizerOpen,
  useIsMobile,
  useParams,
  useToken
} from '@/state/ui';
import { useRTRAPIReady, useRTRError } from '@/state/rtr';

import { IConfigureAPI } from '@/declarations/interfaces';

import { getImgData } from '@/libs/helpers';

import './index.scss';

type ISuspender = {
  read(): IConfigureAPI | null;
};
export type IModelProps = {
  corePromise: ISuspender; 
};

export default React.memo(function Model({ corePromise }: IModelProps) {
  corePromise.read();
  const [rtrStarted, setRTRStarted] = useState(false);
  const [img] = useConfigureImg();
  const imageData = getImgData();
  const [token] = useToken();
  const [isCustomizerOpen, setIsCustomizerOpen] = useIsCustomizerOpen();
  const [isMobile] = useIsMobile();
  const [params] = useParams();
  const [rtrError] = useRTRError();
  const [rtrAPIReady] = useRTRAPIReady();

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
      //TODO
      setTimeout(() => {
        apis.rtrAPI?.init(token);
        setRTRStarted(true);
      }, 50);
    }
  }, [params.rtrDisabled, rtrAPIReady, token, rtrError, rtrStarted]);

  return (img && 
    <section className='yr-model'>
      {(!params.rtrDisabled && !rtrError) && <div id='viewer' className={clsx('yr-model__rtr', { 'yr-model__hidden': !rtrAPIReady })}></div>}
      {(params.rtrDisabled || rtrError)&& 
      <picture
        className={clsx('yr-model__placeholder yr-image', { 'yr-customizer-open': (isCustomizerOpen && isMobile) })}
        onClick={() => {
          if (!isMobile) {
            return;
          }
          return setIsCustomizerOpen(!isCustomizerOpen);
        }}>
          <img
            fetchPriority='high'
            src={img}
            alt='Model'
            height={imageData.dimentions.height}
            width={imageData.dimentions.width}
          />
      </picture>}
    </section>
  );
});

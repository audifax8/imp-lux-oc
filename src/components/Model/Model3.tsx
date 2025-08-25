import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { apis } from '@/libs/apis';

import { useConfigureImg, useIsCustomizerOpen, useIsMobile, useToken } from '@/state/ui';
import { useRTRAPIReady, useRTRDisabled, useRTRError } from '@/state/rtr';

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
  const [rtrDisabled] = useRTRDisabled();
  const [rtrError] = useRTRError();
  const [rtrAPIReady] = useRTRAPIReady();

  useEffect(() => {
    if (rtrDisabled) {
      return;
    }
    if (rtrAPIReady && token && rtrStarted) {
      apis.rtrAPI.setId(token);
    }
    if (rtrAPIReady && token && !rtrStarted) {
      apis.rtrAPI?.init(token);
      setRTRStarted(true);
    }
  }, [rtrDisabled, rtrAPIReady, token, rtrError, rtrStarted]);

  return (img && 
    <section className='yr-model'>
      <div id='viewer' className={clsx('yr-model__rtr', { 'yr-model__hidden': !rtrAPIReady })}></div>
      <picture
        className={clsx('yr-model__placeholder', 'yr-image', { 'yr-model__hidden': rtrAPIReady }, { 'yr-customizer-open': (isCustomizerOpen && isMobile) })}
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
      </picture>
    </section>
  );
});

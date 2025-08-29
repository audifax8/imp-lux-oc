import React from 'react';
import clsx from 'clsx';

import {
  useConfigureImg
} from '@/state/ui';

import {
  useRTRAPIReady,
  useRTRError
} from '@/state/rtr';

import { getImgData } from '@/libs/helpers';
import { ISuspender } from '@/libs/main';

export type IModelProps = {
  mainAPIsPromise: ISuspender; 
};

import './model.scss';

export default React.memo(function Model({ mainAPIsPromise }: IModelProps) {
  mainAPIsPromise.read();
  const [rtrError] = useRTRError();
  const [rtrAPIReady] = useRTRAPIReady();

  const imageData = getImgData();
  const [img] = useConfigureImg();

  return (
    <>
      {(!rtrError && rtrAPIReady) &&
        <div
          id='viewer'
          className={clsx('yr-model__rtr')}
        ></div>
      }
      {(rtrError) &&
        <picture
          className={clsx('yr-model__placeholder yr-image')}
          //onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          >
            <img
              fetchPriority='high'
              src={img}
              alt='Model'
              height={imageData.dimentions.height}
              width={imageData.dimentions.width}
            />
        </picture>
      }
    </>
  );
});

//import React from 'react';
import clsx from 'clsx';

import {
  useConfigureImg,
  useIsCustomizerOpen,
  useIsMobile
} from '@/state/ui';

import {
  useRTRAPIReady,
  useRTRError
} from '@/state/rtr';

import { getImgData } from '@/libs/helpers';

import './model.scss';
import { getSkeletonURL } from '@/declarations/constants';

export default function Model() {
  const [rtrError] = useRTRError();
  const [rtrAPIReady] = useRTRAPIReady();
  const [isMobile] = useIsMobile();

  const [isCustomizerOpen, setIsCustomizerOpen] = useIsCustomizerOpen();

  const imageData = getImgData();
  const [img] = useConfigureImg();
  const skeletonURL = getSkeletonURL();

  return (
    <>
      {(!rtrError && rtrAPIReady) &&
        <div
          id='viewer'
          className={clsx('yr-model__rtr')}
        ></div>
      }
      {
        <picture
          className={clsx('yr-model__placeholder yr-image')}
          onClick={() => {
            if (!isMobile) {
              return;
            }
            setIsCustomizerOpen(!isCustomizerOpen);
          }}
          >
            <img
              fetchPriority='high'
              src={img ?? skeletonURL}
              alt='Model'
              height={imageData.dimentions.height}
              width={imageData.dimentions.width}
            />
        </picture>
      }
    </>
  );
};

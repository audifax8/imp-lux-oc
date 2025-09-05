import clsx from 'clsx';

import {
  useConfigureImg,
  useIsCustomizerOpen,
  useIsMobile
} from '@/state/ui';

import {
  useRTRDisabled
} from '@/state/rtr';

import { getImgData } from '@/libs/helpers';

import './model.scss';
import { getSkeletonURL } from '@/declarations/constants';
import { useEffect, useState } from 'react';
import { apis } from '@/libs/lazyimport';

export default function Model() {
  const [isImageLoaded, setIsImageLoaded] = useState<string | null>(null);
  const [isMobile] = useIsMobile();
  const [rtrDisabled] = useRTRDisabled();

  const [isCustomizerOpen, setIsCustomizerOpen] = useIsCustomizerOpen();

  const imageData = getImgData();
  const [img] = useConfigureImg();
  const skeletonURL = getSkeletonURL();

  useEffect(() => {
    if (rtrDisabled && !isImageLoaded) {
      const url = apis.luxAPI.getProductImg('LUX-Ray-Ban-8taOhSR5AFyjt9tfxU');
      fetch(url)
        .then(() => setIsImageLoaded(url));
    } else if (rtrDisabled && img) {
      setIsImageLoaded(img);
    }
  }, [img, skeletonURL, rtrDisabled, isImageLoaded]);

  return (
    <>
      {!rtrDisabled &&
        <div
          id='viewer'
          className={clsx('yr-model__rtr')}
        ></div>
      }
      {rtrDisabled &&
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
              src={isImageLoaded ?? skeletonURL}
              alt='Model'
              height={imageData.dimentions.height}
              width={imageData.dimentions.width}
            />
        </picture>
      }
    </>
  );
};

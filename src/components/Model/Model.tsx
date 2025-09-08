import {
  useConfigureImg,
  useConfigureImgs,
  useIsCustomizerOpen,
  useIsMobile,
  useViewName
} from '@/state/ui';

import {
  useRTRDisabled
} from '@/state/rtr';

import { getImgData } from '@/libs/helpers';

import './model.scss';
import { getSkeletonURL } from '@/declarations/constants';
import { useEffect, useState } from 'react';
import { apis } from '@/libs/lazyimport';
import { SkeletonVariant } from '@/declarations/enums';
import { Skeleton } from '../skeleton';

export default function Model() {
  const [isImageLoaded, setIsImageLoaded] = useState<string | null>(null);
  const [isMobile] = useIsMobile();
  const [rtrDisabled] = useRTRDisabled();

  const [isCustomizerOpen, setIsCustomizerOpen] = useIsCustomizerOpen();

  const imageData = getImgData();
  const [img] = useConfigureImg();
  const [viewName] = useViewName();
  //?posible error
  const [imgs] = useConfigureImgs();
  const skeletonURL = getSkeletonURL();

  useEffect(() => {
    if (rtrDisabled && !isImageLoaded) {
      const url = apis.luxAPI.getProductImg();
      fetch(url)
        .then(() => setIsImageLoaded(url));
    } else if (rtrDisabled && img) {
      if (img !== isImageLoaded) {
        setIsImageLoaded(img);
      }
    }
  }, [img, skeletonURL, rtrDisabled, isImageLoaded, viewName]);

  return (
    <>
      {!isImageLoaded && rtrDisabled &&
        <Skeleton
          variant={SkeletonVariant.rectangular}
          style={{
            width: imageData.dimentions.width,
            height: imageData.dimentions.height
          }}
        />
      }
      {!rtrDisabled &&
        <div
          id='viewer'
          className='yr-model__rtr'
        >
          <Skeleton
              variant={SkeletonVariant.rectangular}
              style={{
                width: imageData.dimentions.width,
                height: imageData.dimentions.height
              }}
            />
        </div>
      }
      {rtrDisabled &&
        <picture
          className='yr-model__placeholder yr-image'
          onClick={() => {
            if (!isMobile) {
              return;
            }
            setIsCustomizerOpen(!isCustomizerOpen);
          }}>

          {isImageLoaded && 
            <>
              {imgs?.map(
                ({ media, type, url }, index) =>
                  <source
                    key={index}
                    media={media}
                    type={type}
                    srcSet={url}
                  />)
              }
              <img
                fetchPriority='high'
                src={isImageLoaded ?? skeletonURL}
                alt='Model'
                height={imageData.dimentions.height}
                width={imageData.dimentions.width}
              />
            </>
          }
        </picture>
      }
    </>
  );
};

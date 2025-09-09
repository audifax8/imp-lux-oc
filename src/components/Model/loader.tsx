import { useEffect, useState } from 'react';

import { getImgData } from '@/libs/helpers';
import { getSkeletonURL } from '@/declarations/constants';
import { useInitialLoad } from '@/state/ui';
import { SkeletonVariant } from '@/declarations/enums';
import { Skeleton } from '../skeleton';

import './loader.scss';

export function Loader() {
  const [isImageLoaded, setIsImageLoaded] = useState<string | null>(null);
  const imageData = getImgData();
  const skeletonURL = getSkeletonURL();
  const [initialLoaded] = useInitialLoad();

  useEffect(() => {
    if (!isImageLoaded) {
      fetch(skeletonURL)
        .then(() => setIsImageLoaded(skeletonURL));
    }
  }, [skeletonURL, isImageLoaded]);

  return (
    <section className='yr-loader'>
      <div className='yr-loader__logo'>
        {!isImageLoaded &&
          <Skeleton
            variant={SkeletonVariant.rectangular}
            style={{
              width: imageData.dimentions.width,
              height: imageData.dimentions.height
            }}
          />
        }
        {isImageLoaded && 
          <img
            fetchPriority='high'
            src={skeletonURL}
            alt='product loader'
            height={imageData.dimentions.height}
            width={imageData.dimentions.width}
          />
        }
      </div>
      {initialLoaded &&
        <div className='yr-loader__label'>
          <span>starting your remix experience</span>
        </div>
      }
      {initialLoaded &&
        <div className='yr-loader__bar'>
          <span className='yr-loader__bar__progress'></span>
        </div>
      }
    </section>
  );
}

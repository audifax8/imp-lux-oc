import { getImgData } from '@/libs/helpers';
//import { getSkeletonURL } from '@/declarations/constants';
import { useInitialLoad } from '@/state/ui';

import './loader.scss';
import { Skeleton } from '../skeleton';
import { SkeletonVariant } from '@/declarations/enums';

/*

<img
          fetchPriority='high'
          src={skeletonURL}
          alt='product loader'
          height={imageData.dimentions.height}
          width={imageData.dimentions.width}
        />
*/
export function Loader() {
  const imageData = getImgData();
  //const skeletonURL = getSkeletonURL();
  const [initialLoaded] = useInitialLoad();
  return (
    <section className='yr-loader'>
      <div className='yr-loader__logo'>
        <Skeleton
          variant={SkeletonVariant.rectangular}
          style={{
            width: imageData.dimentions.width,
            height: imageData.dimentions.height
          }}
        />
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

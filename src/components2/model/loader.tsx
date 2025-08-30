import { getImgData } from '@/libs/helpers';
import { getSkeletonURL } from '@/declarations/constants';
import { useInitialLoad } from '@/state/ui';

import './loader.scss';

export function Loader() {
  const imageData = getImgData();
  const skeletonURL = getSkeletonURL();
  const [initialLoaded] = useInitialLoad();
  return (
    <section className='yr-loader'>
      <div className='yr-loader__logo'>
        <img
          fetchPriority='high'
          src={skeletonURL}
          alt='product loader'
          height={imageData.dimentions.height}
          width={imageData.dimentions.width}
        />
      </div>
      {initialLoaded &&
        <div className='yr-loader__label'>
          <span>starting your remix experience</span>
        </div>
      }
      {initialLoaded &&
        <div className='yr-loader__progress'>
          <progress value='10' max='100' className='yr-loader__progress__bar'></progress>
        </div>
      }
    </section>
  );
}

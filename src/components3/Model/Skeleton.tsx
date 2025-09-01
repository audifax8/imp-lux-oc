import { getSkeletonURL } from '@/declarations/constants';
import { getImgData } from '@/libs/helpers';

import './skeleton.scss';

export function ModelSkeleton() {
  const skeletonURL = getSkeletonURL();
  const imageData = getImgData();
  return (
    <section className='yr-model'>
      <picture className={('yr-model__placeholder yr-image')}>
        <img
          fetchPriority='high'
          src={skeletonURL}
          alt='product loader'
          height={imageData.dimentions.height}
          width={imageData.dimentions.width}
        />
      </picture>
    </section>
  );
}

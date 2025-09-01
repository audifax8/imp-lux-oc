
import { SkeletonVariant } from '@/declarations/enums';
import { Skeleton } from '@/components2/skeleton';

import './index.scss';

export function HeaderSkeleton() {
  return (
    <details open={false} className='yr-accordion'>
      <summary className='yr-accordion-summary'>
        <Skeleton
          variant={SkeletonVariant.rectangular}
          style={{ width: '48px', height: '48px' }}
        />
        <div className='yr-accordion-header'>
          <Skeleton variant={SkeletonVariant.text} style={{ width: '78px', height: '26px' }} />
          <Skeleton variant={SkeletonVariant.text} style={{ width: '101px', height: '26px' }} />
        </div>
        <Skeleton
          variant={SkeletonVariant.rounded}
          style={
            { width: '26px', height: '26px', borderRadius: '26px' }
          }
        />
      </summary>
    </details>
  );
}

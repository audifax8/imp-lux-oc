import { useIsMobile } from '@/state/ui';

import { SkeletonVariant } from '@/declarations/enums';
import { Skeleton } from '@/components2/skeleton';

import './skeleton.scss';

export default function FooterSkeleton() {
  const [isMobile] = useIsMobile();
  return (
    <div className='yr-footer'>
      {!isMobile &&
        <div className='yr-buttons-section'>
          <Skeleton
            variant={SkeletonVariant.rounded}
            style={{ width: '107px', height: '32px', borderRadius: '48px' }}
          />
          <Skeleton
            variant={SkeletonVariant.rounded}
            style={{ width: '140px', height: '32px', borderRadius: '48px' }}
          />
        </div>
      }
      <div className='yr-footer-price-info'>
        <div className='yr-footer--price'>
          <Skeleton variant={SkeletonVariant.text} style={{ width: '65px', height: '32px' }} />
          <Skeleton variant={SkeletonVariant.text} style={{ width: '54px', height: '26px' }} />
          <Skeleton
            variant={SkeletonVariant.rounded}
            style={{ width: '28px', height: '19px', borderRadius: '32px' }}
          />
        </div>
        <div className='yr-footer--cart'>
          <Skeleton variant={SkeletonVariant.text} style={{ width: '137px', height: '40px' }} />
        </div>
      </div>
    </div>
  );
}

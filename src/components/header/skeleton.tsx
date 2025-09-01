import clsx from 'clsx';

import {
  useIsMobile
} from '@/state/ui';

import { SkeletonVariant } from '@/declarations/enums';
import { ISkeletonProps } from '@/declarations/interfaces';

import { Skeleton } from '@/components/skeleton';

export function HeaderSkeleton() {
  const [isMobile] = useIsMobile();

  const headerCTAs: ISkeletonProps[] = [
    {
      variant: SkeletonVariant.rounded,
      style: { width: '92px', height: '32px', borderRadius: '48px' }
    },
    {
      variant: SkeletonVariant.rounded,
      style: { width: '112px', height: '32px', borderRadius: '48px' }
    }
  ];

  const productName: ISkeletonProps = {
    variant: SkeletonVariant.text,
    style:  isMobile ?
      { width: '114px', height: '32px' } :
      { width: '131px', height: '32px' }
  };

  return (
    <header className='yr-custom-header'>
      <div className={clsx('yr-header-title')}>
        <Skeleton variant={productName.variant} style={productName.style} />
      </div>
      {
        <div className='yr-buttons-section'>
          {headerCTAs.map(
            (cta, index) =>
              <Skeleton key={index} variant={cta.variant} style={cta.style} />
          )}
          {isMobile  &&
            <Skeleton
              variant={SkeletonVariant.rounded}
              style={{
                width: '92px', height: '32px', borderRadius: '48px'
              }} />
          }
        </div>
      }
    </header>
  );
}

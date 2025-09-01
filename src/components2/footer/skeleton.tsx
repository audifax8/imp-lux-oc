import { useIsMobile } from '@/state/ui';

import { SkeletonVariant } from '@/declarations/enums';
import { ISkeletonProps } from '@/declarations/interfaces';

import { Skeleton } from '@/components2/skeleton';

import './skeleton.scss';

export default function FooterSkeleton() {
  const [isMobile] = useIsMobile();
  const footerCTAs: ISkeletonProps[] = [
    {
      variant: SkeletonVariant.rounded,
      style: { width: '92px', height: '32px', borderRadius: '48px' }
    },
    {
      variant: SkeletonVariant.rounded,
      style: { width: '112px', height: '32px', borderRadius: '48px' }
    }
  ];
  const footerPrice: ISkeletonProps[] = [
    {
      variant: SkeletonVariant.text,
      style:  isMobile ?
        { width: '52px', height: '26px' } :
        { width: '65px', height: '32px' }
    },
    {
      variant: SkeletonVariant.text,
      style:  isMobile ?
        { width: '46px', height: '22px' } :
        { width: '54px', height: '26px' }
    },
    {
      variant: SkeletonVariant.rounded,
      style:  isMobile ?
        { width: '44px', height: '20px', borderRadius: '32px' } :
        { width: '28px', height: '19px', borderRadius: '32px' }
    }
  ];

  const atcCTA: ISkeletonProps = {
    variant: SkeletonVariant.text,
    style:  isMobile ?
      { width: '114px', height: '32px' } :
      { width: '137px', height: '40px' }
  };
  return (
    <div className='yr-footer'>
      {!isMobile &&
        <div className='yr-buttons-section'>
          {footerCTAs.map(
            (cta, index) =>
              <Skeleton key={index} variant={cta.variant} style={cta.style} />
          )}
        </div>
      }
      <div className='yr-footer-price-info'>
        <div className='yr-footer--price'>
          {footerPrice.map(
            (cta, index) =>
              <Skeleton key={index} variant={cta.variant} style={cta.style} />
            )}
        </div>
        <div className='yr-footer--cart'>
          <Skeleton variant={atcCTA.variant} style={atcCTA.style} />
        </div>
      </div>
    </div>
  );
}

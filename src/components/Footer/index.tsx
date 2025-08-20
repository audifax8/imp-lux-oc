import { useIsMobile, useShowSkeleton } from '@/state/ui';

import { useClsxWithSkeleton } from '@/hooks/useClsxWithSkeleton';

import { RXCButton } from '@/components/RXC/RXCButton';
import { VMButton } from '@/components/VM/VMButton';
import { Button } from '@/components/Button';

import './index.scss';

export function Footer() {
  const [isMobile] = useIsMobile();
  const [showSkeleton] = useShowSkeleton();
  const clsxWithSkeleton = useClsxWithSkeleton();

  return (
    <div className='yr-footer'>
      {!isMobile &&
        <div className='yr-buttons-section'>
          <VMButton />
          <RXCButton />
        </div>
      }
      <div className='yr-footer-price-info'>
        <div className={`yr-footer--price`}>
          <div className={`yr-footer-final-price ${showSkeleton ? 'yr-skeleton': ''}`}>
            <label>$180.00</label>
          </div>
          <div className={`yr-footer-total-price ${showSkeleton ? 'yr-skeleton': ''}`}>
            <label>$200.00</label>
          </div>
          <div className={`yr-footer-discount-price ${showSkeleton ? 'yr-skeleton': ''}`}>
            <label>-20%</label>
          </div>
        </div>
        <div className='yr-footer--cart'>
          <Button className={clsxWithSkeleton('yr-add-to-cart-button')} variant="square">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
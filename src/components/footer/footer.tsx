import clsx from 'clsx';

import { useIsMobile } from '@/state/ui';

import { Button } from '@/components/button';

import './index.scss';

export default function Footer() {
  const [isMobile] = useIsMobile();

  return (
    <div className='yr-footer'>
      {!isMobile &&
        <div className='yr-buttons-section'></div>
      }
      <div className='yr-footer-price-info'>
        <div className={`yr-footer--price`}>
          <div className={`yr-footer--price__final`}>
            <label>$180.00</label>
          </div>
          <div className={`yr-footer--price__total`}>
            <label>$200.00</label>
          </div>
          <div className={`yr-footer--price__discount`}>
            <label>-20%</label>
          </div>
        </div>
        <div className='yr-footer--cart'>
          <Button className={clsx('yr-add-to-cart-button')} variant='square'>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
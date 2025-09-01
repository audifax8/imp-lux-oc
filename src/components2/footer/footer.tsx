import clsx from 'clsx';

import { useIsMobile } from '@/state/ui';

import { IConfigureAPI } from '@/declarations/interfaces';

import { RXCButton } from '@/components2/RXC/RXCButton';
import { VMButton } from '@/components2/VM/VMButton';
import { Button } from '@/components2/button';

import './index.scss';

export type ISuspender = {
  read(): IConfigureAPI | null;
};

export type IFooterProps = {
  corePromise: ISuspender; 
};

export default function Footer({ corePromise }: IFooterProps) {
  corePromise.read();

  const [isMobile] = useIsMobile();

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
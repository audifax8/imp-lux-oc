import clsx from 'clsx';

import { useIsCustomizerOpen, useIsMobile, useTheme } from '@/state/ui';
//import { useTheme } from '@/state/ui';

/*import Model from '@/components/Model';
import { Menu } from '@/components/Menu';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header/Header';
import { RBNHeader } from '@/components/RBNHeader';*/

import Model from '@/components2/model';
import { Menu } from '@/components2/menu';
//import { ArrowIcon, TryOnIcon } from '../Icons';
//import { TryOnIcon } from '@/components2/Icons';
//import { Button } from '@/components2/button';

/*
<Button
          className='yr-header-go-back-button'
          showSkeleton={true}
        />
        <Button
          variant="rounded"
          icon={<TryOnIcon size={18} />}
        >
          try on
        </Button>
        <Button
          className='yr-header-go-back-button'
          variant='square'
          showSkeleton={true}
        />

        <Button className={'yr-add-to-cart-button'} variant='square'>
          Add to Cart
        </Button>
*/

import './index.scss';

export function AppLayout() {
  const [isMobile] = useIsMobile();
  const [theme] = useTheme();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  return (
    <div
      className={clsx(
        'yr-app-layout',
        theme
      )}>
        <div className='yr-content'>
          <div
            className={clsx(
              'yr-main',
              { 'yr-customizer-open': (isCustomizerOpen && isMobile) }
            )}>
              <Model />
              <Menu />
          </div>
        </div>
        <div id='rxcApp' className='rxcApp'></div>
    </div>
  );
}

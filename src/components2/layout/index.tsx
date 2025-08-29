import clsx from 'clsx';

import {
  useIsCustomizerOpen,
  useIsMobile,
  useTheme
} from '@/state/ui';

import Model from '@/components2/model';
import { Menu } from '@/components2/menu';
import { Header } from '@/components2/header';
import Footer from '@/components2/footer';

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
          {isMobile && <Header />}
          <div
            className={clsx(
              'yr-main',
              { 'yr-customizer-open': (isCustomizerOpen && isMobile) }
            )}>
              <Model />
              <Menu />
          </div>
          <Footer />
        </div>
        <div id='rxcApp' className='rxcApp'></div>
    </div>
  );
}

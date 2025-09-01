import clsx from 'clsx';

import {
  useIsCustomizerOpen,
  useIsMobile,
  useParams,
  useTheme
} from '@/state/ui';

import Model from '@/components/model';
import { Menu } from '@/components/menu';
import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { RBNHeader } from '@/components/RBNHeader';

import './index.scss';

export function AppLayout() {
  const [params] = useParams();
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
          {params?.showHeader && <RBNHeader />}
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

import clsx from 'clsx';

import { useIsMobile, useParams, useTheme } from '@/state/ui';

import Model from '@/components/Model';
import { Menu } from '@/components/Menu';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header/Header';
import { RBNHeader } from '@/components/RBNHeader';

import './index.scss';

export function AppLayout() {
  const [isMobile] = useIsMobile();
  const [theme] = useTheme();
  const [params] = useParams();

  return (
    <main
      className={clsx(
        'yr-app-layout',
        theme
      )}>
        {params?.showHeader && <RBNHeader />}
        {isMobile && <Header />}
        <div className='yr-main-content'>
          <Model />
          <Menu />
        </div>
        <Footer />
        <div id='rxcApp' className='rxcApp'></div>
    </main>
  );
}

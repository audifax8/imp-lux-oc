import clsx from 'clsx';

import { useIsMobile, useParams, useTheme } from '@/state/ui';

import Model from '@/components/Model';
import { Menu } from '@/components/Menu';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header/Header';
import { RBNHeader } from '@/components/RBNHeader';

import './index.scss';

/**
{params?.showHeader && <RBNHeader />}
        {isMobile && <Header />}
        <div className='yr-main-content'>
          <Model />
          <Menu />
        </div>
        <Footer />
*/

export function AppLayout() {
  const [isMobile] = useIsMobile();
  const [theme] = useTheme();
  const [params] = useParams();

  return (
    <div
      className={clsx(
        'yr-app-layout',
        theme
      )}>
        <div className='yr-main-content'>
          {params?.showHeader && <RBNHeader />}
          {isMobile && <Header />}
          <div className="content">
            <Model />
            <Menu />
          </div>
          <Footer />
        </div>
        <div id='rxcApp' className='rxcApp'></div>
    </div>
  );
}

/*

      
  */
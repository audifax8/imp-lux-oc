import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { useParams, useTheme, useIsCustomizerOpen, useIsMobile } from '@/state/ui';

//import { Menu } from '@/components/Menu';
//import { ModelSkeleton } from '@/components/Model/Skeleton';
import { RBNHeader } from '@/components/RBNHeader';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import MobileMock from '@/components/AppMock/Mobile';
import DesktopMock from '@/components/AppMock/Desktop';

const Model = lazy(() => import('../Model/Model'));

export function AppLayout() {
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const [isMobile] = useIsMobile();
  const [theme] = useTheme();
  const [params] = useParams();
  return (
    <main
      className={clsx(
        'yr-app-layout',
        theme,
        { 'yr-customizer-open': isCustomizerOpen },
        //{ 'yr-show-img': params.showBackgroundImage }
      )}>
      {params?.showHeader && <RBNHeader />}
      {isMobile && <Header />}
      <Suspense fallback={isMobile ? <MobileMock /> : <DesktopMock />}>
        <div className="yr-main-content">
          <Model />
        </div>
        <Footer />
      </Suspense>
      <div id='rxcApp' className='rxcApp'></div>
    </main>
  );
}

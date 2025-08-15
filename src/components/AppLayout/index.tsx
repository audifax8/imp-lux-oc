import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { useTheme } from '@/state/ui';

//import { useApiready } from '@/libs/yr-react/hooks/configure';

import { Menu } from '@/components/Menu';
import { Header } from '@/components/Header';
import { ModelSkeleton } from '@/components/Model/Skeleton';

//import { useParams } from '@/state/implementation';
//import { useIsCustomizerOpen, useIsMobile, useTheme } from '@/state/ui';
//import { Header } from '@/components/Header';
//import { Model } from '@/components/Model';
//import { AddToCart } from '@/components/AddToCart';
//import { Customizer } from '@/components/Customizer';
//import { ModelSkeleton } from '../Model/skeleton';

const Model = lazy(() => import('../Model/Model'));

export function AppLayout() {
  //const apiReady = useApiready();
  //const [isCustomizerOpen] = useIsCustomizerOpen();
  const [theme] = useTheme();
  //const [isMobile] = useIsMobile();
  //const params = useParams();
  return (
    <main
      className={clsx(
        'yr-app-layout',
        theme,
        //{ 'yr-customizer-open': isCustomizerOpen },
        //{ 'yr-show-img': params.showBackgroundImage }
      )}>
      <Header />
      <div className="yr-main-content">
        <Suspense fallback={<ModelSkeleton />}>
          <Model />
        </Suspense>
        <>
          <Menu />
        </>
      </div>
      <div id='rxcApp' className='rxcApp'></div>
    </main>
  );
}

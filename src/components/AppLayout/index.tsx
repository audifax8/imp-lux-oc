import clsx from 'clsx';

import { useIsMobile, useParams, useTheme } from '@/state/ui';

//import { apis } from '@/libs/apis';
//import { IConfigureAPI } from '@/declarations/interfaces';

//import { Menu } from '@/components/Menu';
//import { ModelSkeleton } from '@/components/Model/Skeleton';
/*import { RBNHeader } from '@/components/RBNHeader';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import MobileMock from '@/components/AppMock/Mobile';
import DesktopMock from '@/components/AppMock/Desktop';*/

//import { apis } from '@/libs/apis';

//import { coreResource, createCorePromise } from '@/components/Core';
//import { CDN_FLUID_BASE_URL } from '@/declarations/constants';
import Model from '@/components/Model';
import { Menu } from '@/components/Menu';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header/Header';
import { RBNHeader } from '@/components/RBNHeader';

import './index.scss';

/*
<Suspense fallback={<></>}>
          <CoreComponent resource={resource} />
        </Suspense>
*/
export function AppLayout() {
  //const [isCustomizerOpen] = useIsCustomizerOpen();
  const [isMobile] = useIsMobile();
  const [theme] = useTheme();
  const [params] = useParams();

  return (
    <main
      className={clsx(
        'yr-app-layout',
        theme,
        //{ 'yr-customizer-open': isCustomizerOpen },
        //{ 'yr-show-img': params.showBackgroundImage }
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

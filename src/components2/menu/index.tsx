import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { useIsCustomizerOpen } from '@/state/ui';
//import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';

//import { Header } from '@/components/Header/Header';

//import { apis } from '@/libs/apis';
//import { mainResourcesPromise, mainSuspender } from '@/libs/main';
import MenuSkeleton from './skeleton';
import { coreResource, waitForCoreReady } from '@/libs/core';

const Accordion = lazy(() => import('./accordion'));

import './index.scss';

export function Menu() {
  //const [isMobile] = useIsMobile();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const corePromise = coreResource(waitForCoreReady());
  return (
    <div className={clsx('yr-menu', { 'yr-customizer-open': isCustomizerOpen })}>
      <div className={clsx('yr-customizer', { 'yr-customizer-open': isCustomizerOpen })}>
        <Suspense fallback={<MenuSkeleton />}>
          <Accordion corePromise={corePromise} />
        </Suspense>
      </div>
    </div>
  );
}

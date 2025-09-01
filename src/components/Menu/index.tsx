import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';

import MenuSkeleton from './skeleton';
import { coreResource, waitForCoreReady } from '@/libs/core';

import { Header } from '@/components/header';

const Accordion = lazy(() => import('./accordion'));

import './index.scss';

export function Menu() {
  const [isMobile] = useIsMobile();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const corePromise = coreResource(waitForCoreReady());
  return (
    <div className={clsx('yr-menu', { 'yr-customizer-open': isCustomizerOpen })}>
      {!isMobile && <Header />}
      <div className={clsx('yr-customizer', { 'yr-customizer-open': isCustomizerOpen })}>
        <Suspense fallback={<MenuSkeleton />}>
          <Accordion corePromise={corePromise} />
        </Suspense>
      </div>
    </div>
  );
}

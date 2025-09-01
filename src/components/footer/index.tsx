import { lazy, Suspense } from 'react';

import FooterSkeleton from './skeleton';
import { coreResource, waitForCoreReady } from '@/libs/core';

const Foot = lazy(() => import('./footer'));

export default function Footer() {
  const corePromise = coreResource(waitForCoreReady());
  return(
    <Suspense fallback={<FooterSkeleton />}>
      <Foot corePromise={corePromise} />
    </Suspense>
  );
};
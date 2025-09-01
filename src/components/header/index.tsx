import { lazy, Suspense } from 'react';

import { coreResource, waitForCoreReady } from '@/libs/core';

import { HeaderSkeleton } from './skeleton';

import './index.scss';

const Head = lazy(() => import('./header'));

export function Header() {
  const corePromise = coreResource(waitForCoreReady());
  return (
    <header className='yr-custom-header'>
      <Suspense fallback={<HeaderSkeleton />}>
        <Head corePromise={corePromise} />
      </Suspense>
    </header>
  );
}

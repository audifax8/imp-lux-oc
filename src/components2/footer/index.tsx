import { lazy, Suspense } from 'react';

import { coreResource, createCorePromise } from '@/libs/core';

import FooterSkeleton from './skeleton';
import { apis } from '@/libs/apis';

const Foot = lazy(() => import('./Footer'));

export default function Footer() {
  const corePromise = coreResource(createCorePromise(apis.getParams()));
  return(
    <Suspense fallback={<FooterSkeleton />}>
      <Foot corePromise={corePromise} />
    </Suspense>
  );
};
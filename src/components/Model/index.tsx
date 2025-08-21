import { lazy, Suspense } from 'react';

import { coreResource, createCorePromise } from '@/components/Core';

import { ModelSkeleton } from './Skeleton';
import { apis } from '@/libs/apis';

const Product = lazy(() => import('./Model3'));

export default function Model() {
  const corePromise = coreResource(createCorePromise(apis.getParams()));
  return(
    <Suspense fallback={<ModelSkeleton />}>
      <Product corePromise={corePromise} />
    </Suspense>
  );
};
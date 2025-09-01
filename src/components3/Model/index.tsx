import { lazy, Suspense } from 'react';

import { coreResource, createCorePromise } from '@/libs/core';
import { rtrResource, rtrLoadedPromise } from '@/libs/rtr';

import { ModelSkeleton } from './Skeleton';
import { apis } from '@/libs/apis';
import { useParams } from '@/state/ui';

const Product = lazy(() => import('./Model3'));
const RTR = lazy(() => import('./rtr'));

export default function Model() {
  const [params] = useParams();
  //TODO
  const corePromise = coreResource(createCorePromise(apis.getParams()));
  const rtrPromise = rtrResource(rtrLoadedPromise(apis.getParams()));
  return(
    <Suspense fallback={<ModelSkeleton />}>
      {params.rtrDisabled ?
        <Product corePromise={corePromise} /> :
        <RTR corePromise={rtrPromise} />
      }
    </Suspense>
  );
};
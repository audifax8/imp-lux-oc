import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { apis } from '@/libs/apis';
import { Loader } from './loader';

import { mainSuspender, mainResourcesPromise } from '@/libs/main';
import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';

const LazyModel = lazy(() => import('./model'));

export default function Model() {
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const [isMobile] = useIsMobile();
  const mainAPIsPromise = mainSuspender(mainResourcesPromise(apis.getParams()));
  return(
    <div className={clsx('yr-model', { 'yr-customizer-open': (isCustomizerOpen && isMobile) })}>
      <Suspense fallback={<Loader />}>
        <LazyModel mainAPIsPromise={mainAPIsPromise}/>
      </Suspense>
    </div>
  );
};
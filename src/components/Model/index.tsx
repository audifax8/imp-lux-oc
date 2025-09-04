import { Suspense } from 'react';
import clsx from 'clsx';

import { Loader } from './loader';

import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';
import { LazyModel } from '@/libs/lazyimport';

export default function Model() {
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const [isMobile] = useIsMobile();
  return(
    <div className={clsx('yr-model', { 'yr-customizer-open': (isCustomizerOpen && isMobile) })}>
      <Suspense fallback={<Loader />}>
        <LazyModel />
      </Suspense>
    </div>
  );
};
import { Suspense } from 'react';

import FooterSkeleton from './skeleton';
import { LazyFooter } from '@/libs/lazyimport';

export default function Footer() {
  return(
    <Suspense fallback={<FooterSkeleton />}>
      <LazyFooter />
    </Suspense>
  );
};
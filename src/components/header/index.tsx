import { Suspense } from 'react';

import { HeaderSkeleton } from './skeleton';
import { LazyHeader } from '@/libs/lazyimport';

import './index.scss';

export function Header() {
  return (
    <header className='yr-custom-header'>
      <Suspense fallback={<HeaderSkeleton />}>
        <LazyHeader />
      </Suspense>
    </header>
  );
}

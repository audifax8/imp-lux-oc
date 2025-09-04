import { Suspense } from 'react';
import clsx from 'clsx';

import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';

import MenuSkeleton from './skeleton';

import { Header } from '@/components/header';
import { LazyMenu } from '@/libs/lazyimport';

import './index.scss';

export function Menu() {
  const [isMobile] = useIsMobile();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  return (
    <div className={clsx('yr-menu', { 'yr-customizer-open': isCustomizerOpen })}>
      {!isMobile && <Header />}
      <div className={clsx('yr-customizer', { 'yr-customizer-open': isCustomizerOpen })}>
        <Suspense fallback={<MenuSkeleton />}>
          <LazyMenu />
        </Suspense>
      </div>
    </div>
  );
}

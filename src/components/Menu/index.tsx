import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';

import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

import { AccordionSkeleton } from '@/components/Accordion/Skeleton';
import { Header } from '@/components/Header/Header';

const Configurator = lazy(() => import('../Accordion/index'));

import './index.scss';

export function Menu() {
  const [isMobile] = useIsMobile();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className={clsx('yr-menu', { 'yr-customizer-open': isCustomizerOpen })}>
              {!isMobile && <Header />}
              <div className='yr-customizer'>
                {MOCK_RBN_MENU_ITEMS.map((item) => <AccordionSkeleton key={item.name} item={item} />)}
              </div>
            </div>
          </>
          }
        >
          <div className='yr-menu'>
            {!isMobile && <Header />}
            <div className={clsx('yr-customizer', { 'yr-customizer-open': isCustomizerOpen })}>
              {MOCK_RBN_MENU_ITEMS.map((item) => <Configurator key={item.name} item={item} />)}
            </div>
          </div>
      </Suspense>
    </>
  );
}

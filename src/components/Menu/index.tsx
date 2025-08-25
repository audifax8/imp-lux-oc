import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';

import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

import { AccordionSkeleton } from '@/components/Accordion/Skeleton';
import { Header } from '@/components/Header/Header';

import { apis } from '@/libs/apis';
import { coreResource, createCorePromise } from '@/libs/core';

const Configurator = lazy(() => import('../Accordion2/index'));

import './index.scss';
export function Menu() {
  const [isMobile] = useIsMobile();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const corePromise = coreResource(createCorePromise(apis.getParams()));
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className={clsx('yr-menu', { 'yr-customizer-open': isCustomizerOpen })}>
              {!isMobile && <Header />}
              <div className={clsx('yr-customizer', { 'yr-customizer-open': isCustomizerOpen })}>
                {MOCK_RBN_MENU_ITEMS
                  .map(
                    ({ id, caName, alias, selectedAvId, selectedAvName, icon }) =>
                      <AccordionSkeleton
                        id={id}
                        key={id}
                        alias={caName || alias}
                        icon={icon}
                        selectedAvName={selectedAvName}
                        selectedAvId={selectedAvId}
                      />
                  )
                }
              </div>
            </div>
          </>
          }
        >
          <div className={clsx('yr-menu', { 'yr-customizer-open': isCustomizerOpen })}>
            {!isMobile && <Header />}
            <div className={clsx('yr-customizer', { 'yr-customizer-open': isCustomizerOpen })}>
              <Configurator corePromise={corePromise} />
            </div>
          </div>
      </Suspense>
    </>
  );
}

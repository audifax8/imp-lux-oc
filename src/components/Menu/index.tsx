import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import { useCAS, useIsCustomizerOpen, useIsMobile } from '@/state/ui';

import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

import { AccordionSkeleton } from '@/components/Accordion/Skeleton';
import { Header } from '@/components/Header/Header';

const Configurator = lazy(() => import('../Accordion/index'));

import './index.scss';

export function Menu() {
  const [isMobile] = useIsMobile();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const [cas] = useCAS();
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
                    ({ id, name, alias, selectedAvId, selectedAvName, icon }) =>
                      <AccordionSkeleton
                        id={id}
                        key={id}
                        alias={name || alias}
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
              {cas
                .map(
                  ({ id, name, alias, selectedAvId, selectedAvName, icon }) =>
                    <Configurator 
                      id={id}
                      key={id}
                      alias={name || alias}
                      icon={icon}
                      selectedAvName={selectedAvName}
                      selectedAvId={selectedAvId}
                    />
                )
              }
            </div>
          </div>
      </Suspense>
    </>
  );
}

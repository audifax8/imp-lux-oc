import { lazy, Suspense } from 'react';

import { useIsMobile } from '@/state/ui';

import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

import { AccordionSkeleton } from '@/components/Accordion/Skeleton';
import { Header } from '@/components/Header';

const Configurator = lazy(() => import('../Accordion/index'));

export function Menu() {
  const [isMobile] = useIsMobile();
  return (
    <div className="yr-menu">
      {!isMobile && <Header />}
      <div className="yr-customizer">
        <Suspense
          fallback={
            MOCK_RBN_MENU_ITEMS.map((item) => <AccordionSkeleton key={item.name} item={item} />)}
          >
            {MOCK_RBN_MENU_ITEMS.map((item) => <Configurator key={item.name} item={item} />)}
        </Suspense>
      </div>
    </div>
  );
}

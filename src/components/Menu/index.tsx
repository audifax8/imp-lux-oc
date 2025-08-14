import { lazy, Suspense } from 'react';

import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

import { AccordionSkeleton } from '@/components/Accordion/Skeleton';
//import { Accordion } from '@/components/Accordion';

const Configurator = lazy(() => import('../Accordion/index'));

//{MOCK_RBN_MENU_ITEMS.map((item) => <Configurator key={item.name} item={item} />)}
export function Menu() {
  return (
    <div className="yr-customizer">
      <Suspense
        fallback={MOCK_RBN_MENU_ITEMS.map((item) => <AccordionSkeleton key={item.name} item={item} />)}>
        {MOCK_RBN_MENU_ITEMS.map((item) => <Configurator key={item.name} item={item} />)}
      </Suspense>
    </div>
  );
}

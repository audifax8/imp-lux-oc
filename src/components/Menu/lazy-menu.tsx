import { useCAS } from '@/state/ui';

import AccordionSlide from './accordion';

export default function LazyMenu() {
  const [cas] = useCAS();

  return (
    <>
      {cas?.map((menu) => <AccordionSlide menu={menu} key={menu.id} />)}
    </>
  );
};

import { useCAS } from '@/state/ui';

import Header from './components/header';

export default function Accordion() {
  const [cas] = useCAS();

  return (
    <>
      {cas?.map((ca) => <Header menu={ca} key={ca.id} />)}
    </>
  );
};

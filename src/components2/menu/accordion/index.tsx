import React from 'react';

import { IConfigureAPI } from '@/declarations/interfaces';
import { useCAS } from '@/state/ui';

import Header from './components/header';

export type ISuspender = {
  read(): IConfigureAPI | null;
};

export type IAccordionProps = {
  corePromise: ISuspender; 
};

export default React.memo(function Accordion({ corePromise }: IAccordionProps) {
  corePromise.read();
  const [cas] = useCAS();

  return (
    <>
      {cas.map((ca) => <Header menu={ca} key={ca.id} />)}
    </>
  );
});

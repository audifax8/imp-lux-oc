import React from 'react';
//import clsx from 'clsx';

//import { apis } from '@/libs/apis';

//import { ISuspender } from '@/libs/main';

export type ISuspender = {
  read(): IConfigureAPI | null;
};

export type IAccordionProps = {
  corePromise: ISuspender; 
};

import './index.scss';
import { IConfigureAPI } from '@/declarations/interfaces';

export default React.memo(function Accordion({ corePromise }: IAccordionProps) {
  corePromise.read();

  return (
    <>
      <p>p</p>
    </>
  );
});

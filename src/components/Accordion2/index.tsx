import React from 'react';
import clsx from 'clsx';

import { useCAS, useIsCustomizerOpen } from '@/state/ui';

import { IConfigureAPI } from '@/declarations/interfaces';

import Accordion from '@/components/Accordion2/components/Header';

import './index.scss';

type ISuspender = {
  read(): IConfigureAPI | null;
};
export type IModelProps = {
  corePromise: ISuspender; 
};

export default React.memo(function Configurator({ corePromise }: IModelProps) {
  corePromise.read();
  const [isCustomizerOpen] = useIsCustomizerOpen();
  const [cas] = useCAS();

  return ( cas.length && 
    <section className={clsx('yr-customizer', { 'yr-customizer-open': isCustomizerOpen })}>
      {cas.map((ca) => <Accordion menu={ca} key={ca.id} />)}
    </section>
  );
});

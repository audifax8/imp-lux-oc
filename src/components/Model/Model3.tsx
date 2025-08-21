import React from 'react';
import clsx from 'clsx';

import { IConfigureAPI } from '@/declarations/interfaces';

import { apis } from '@/libs/apis';
import { getImgData } from '@/libs/helpers';

import './index.scss';

type ISuspender = {
  read(): IConfigureAPI | null;
};
export type IModelProps = {
  corePromise: ISuspender; 
};

export default React.memo(function Model({ corePromise }: IModelProps) {
  corePromise.read();
  const img = apis?.luxAPI?.getProductImg('LUX-Ray-Ban-8taOhSR5AFyjt9tfxU');
  const imageData = getImgData();

  return (img && 
    <section className='yr-model'>
      <picture
        className={clsx('yr-model__placeholder', 'yr-image', { 'yr-model__hidden': false })}>
          <img
            fetchPriority='high'
            src={img}
            alt='Model'
            height={imageData.dimentions.height}
            width={imageData.dimentions.width}
          />
      </picture>
    </section>
  );
});

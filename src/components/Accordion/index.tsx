
import { use, useState } from 'react';

import { Image } from '@/components/Image';
import { Button } from '@/components/Button';
import { ArrowIcon } from '@/components/Icons';

const menuPromise = new Promise((resolve) => {
//const menuPromise = new Promise(() => {
  //TODO
  //const { workflow, customer, product, locale, yrEnv } = apis.getParams();
  return setTimeout(() => resolve(true), 4000);
});

import './index.scss';
import { ICAMap } from '@/declarations/interfaces';

export default function Accordion(props: ICAMap) {
  const { alias, icon, selectedAvName, open } = props;
  const [isOpen, setIsOpen] = useState(open);
  use(menuPromise);
  return (
    <details open={isOpen} className='yr-accordion'>
      <summary className='yr-accordion-summary'>
        <Image src={icon} alt={alias} className='yr-accordion-summary-image' />
        <div className='yr-accordion-header'>
          <h3 className={'yr-accordion-header-title'}>{alias}</h3>
          <p className={'yr-accordion-header-selected'}>{selectedAvName}</p>
        </div>
        <Button
          icon={<ArrowIcon size={16} direction={isOpen ? 'up' : 'down'} />}
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        />
      </summary>
      <div className='yr-accordion-content'>
        <p>Accordion content</p>
      </div>
    </details>
  );
}

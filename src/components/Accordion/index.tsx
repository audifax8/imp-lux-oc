
import { use, useState } from 'react';

import { Image } from '@/components/Image';
import { Button } from '@/components/Button';
import { ArrowIcon } from '@/components/Icons';

type AccordionProps = {
  item: {
    name: string;
    selected: string;
    upcharge: string | null;
    img: string;
  };
  open?: boolean;
};

const myPromise = new Promise((resolve) => {
  //TODO
  //const { workflow, customer, product, locale, yrEnv } = apis.getParams();
  return setTimeout(() => resolve(true), 4000);
});

export default function Accordion({ item, open = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(open);
  use(myPromise);
  return (
    <details open={isOpen} className="yr-accordion">
      <summary className="yr-accordion-summary">
        <Image src={item.img} alt={item.name} className="yr-accordion-summary-image" />
        <div className="yr-accordion-header">
          <h3 className={'yr-accordion-header-title'}>{item.name}</h3>
          <p className={'yr-accordion-header-selected'}>{item.selected}</p>
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
      <div className="yr-accordion-content">
        <p>Accordion content</p>
      </div>
    </details>
  );
}

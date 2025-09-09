
import { IMenuCA } from '@/declarations/interfaces';

import { Image } from '@/components/img';
import { Button } from '@/components/button';
import { ArrowIcon } from '@/components/Icons';

import './index.scss';

type IHeader = {
  menu: IMenuCA,
  isOpen?: boolean,
  selectedAvId?: number | null,
  selectedAvName?: string,
  onOpenCallback?(event: React.MouseEvent): void;
};

export default function Header(props: IHeader) {
  const { alias, icon, caName, selectedAvName } = props.menu;
  const { isOpen, onOpenCallback } = props;

  const onOpenClick = (e: React.MouseEvent) => {
    if (onOpenCallback) {
      onOpenCallback(e);
    }
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <summary className='yr-accordion-summary'>
        <Image src={icon} alt={alias} className='yr-accordion-summary-image' />
        <div className='yr-accordion-header'>
          <h3 className='yr-accordion-header-title'>{caName}</h3>
          <p className='yr-accordion-header-selected'>{selectedAvName}</p>
        </div>
        <Button
          icon={<ArrowIcon size={16} direction={isOpen ? 'up' : 'down'} className='yr-accordion-arrow'/>}
          onClick={onOpenClick}
        />
      </summary>
    </>
  );
}

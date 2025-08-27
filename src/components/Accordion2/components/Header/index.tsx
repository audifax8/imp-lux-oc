
import { useState } from 'react';

import { IAttributeValue, IMenuCA } from '@/declarations/interfaces';

import { Image } from '@/components/Image';
import { Button } from '@/components/Button';
import { ArrowIcon } from '@/components/Icons';
import { Swatch } from '../swatch';
import { ViewMore } from '../view-more';
import { apis } from '@/libs/apis';

import './index.scss';
import { reloadPagination, setTokenAndImage } from '@/store/UIStore';

type IAccordeon = {
  menu: IMenuCA
};

export default function Accordion(props: IAccordeon) {
  const { alias, icon, avs, currentPage, avsLenght, caName } = props.menu;
  const [selectedAvId, setSelectedAvId] = useState(props.menu.selectedAvId);
  const [selectedAvName, setSelectedName] = useState(props.menu.selectedAvName);
  const [isOpen, setIsOpen] = useState(false);

  const onViewMoreClick = () => {
    const newData = apis.luxAPI.reloadPagination(props.menu);
    return reloadPagination(newData);
  }

  const onSwatchClick = async (av: IAttributeValue) => {
    try {
      await apis.setRecipe(
        [{ ca: { alias }, av: { id: av.id } }]
      );
      const token = apis.luxAPI.getToken();
      const img = apis.getImg();
      setTokenAndImage(token, img);
      setSelectedAvId(av.id);
      setSelectedName(av.name);
    } catch (e) {
      console.log(e);
    }
  };

  const onOpenClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <details
      open={isOpen}
      className='yr-accordion'
      onClick={onOpenClick}
    >
      <summary className='yr-accordion-summary'>
        <Image src={icon} alt={alias} className='yr-accordion-summary-image' />
        <div className='yr-accordion-header'>
          <h3 className={'yr-accordion-header-title'}>{caName}</h3>
          <p className={'yr-accordion-header-selected'}>{selectedAvName}</p>
        </div>
        <Button
          icon={<ArrowIcon size={16} direction={isOpen ? 'up' : 'down'} className='yr-accordion-arrow'/>}
          tabIndex={-1}
          onClick={onOpenClick}
        />
      </summary>
      <div className='yr-accordion-content'>
        {isOpen && (
          <ul
            className='fc-attribute-values'
            aria-label='attribute values menu'
          >
            {avs && avs?.length && (
              avs.map(
                (av, index: number) => 
                  <li key={av.id || index}>
                    <Swatch
                      av={av}
                      caAlias={alias}
                      selectedAvId={selectedAvId}
                      index={index}
                      onClickCallback={onSwatchClick}
                    />
                  </li>
              )
            )}
            {currentPage < avsLenght &&
              <li key={avs?.length}>
                <ViewMore
                  remainingItems={avsLenght - currentPage}
                  label='view more'
                  onClickCallback={onViewMoreClick}
                />
              </li>
            }
          </ul>
        )}
      </div>
    </details>
  );
}

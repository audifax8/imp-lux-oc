
import { IAttributeValue, IMenuCA } from '@/declarations/interfaces';

import { Swatch } from '../swatch';
import { ViewMore } from '../view-more';

import './index.scss';

type IContent = {
  menu: IMenuCA,
  isOpen: boolean,
  selectedAvId: number | null,
  selectedAvName: string,
  onSwatchClickCB?(av: IAttributeValue, event: React.MouseEvent): void;
  onViewMoreClickCB?(event: React.MouseEvent): void;
};

export default function Content(props: IContent) {
  const { alias, avs, currentPage, avsLenght } = props.menu;
  const {
    isOpen,
    selectedAvId,
    onViewMoreClickCB,
    onSwatchClickCB
  } = props;

  const onViewMoreClick = (e: React.MouseEvent) => {
    if (onViewMoreClickCB) {
      onViewMoreClickCB(e);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  const onSwatchClick = async (av: IAttributeValue, event: React.MouseEvent) => {
    if (onSwatchClickCB) {
      onSwatchClickCB(av, event);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      {isOpen &&
        <div className='yr-accordion-content'>
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
        </div>
      }
    </>
  );
}

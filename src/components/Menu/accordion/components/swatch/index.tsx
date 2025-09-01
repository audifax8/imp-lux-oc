import { memo, useCallback } from 'react';

import { IAttributeValue } from '@/declarations/interfaces';
import { Image } from '@/components/img';

import './index.scss';

export interface ISwatchPropTypes {
  av: IAttributeValue;
  caAlias: string | undefined;
  selectedAvId: number | null;
  index?: number;
  onClickCallback?(av: IAttributeValue, event: React.MouseEvent): void;
};

export const Swatch = memo(function (props: ISwatchPropTypes) {
  const { av, selectedAvId, onClickCallback } = props;

  const imgClasses =
    `fc-swatch-wrapper--img ${av.id === selectedAvId ?
      'fc-swatch-wrapper--img--selected':
      'fc-swatch-wrapper--img--border'}`;

  const click = useCallback((av: IAttributeValue, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClickCallback) {
      return onClickCallback(av, e);
    }
    return e;
  }, [onClickCallback]);

  return (
    <button
      type='button'
      className='fc-swatch'
      onClick={(e: React.MouseEvent) => click(av, e)}
    >
      <div className='fc-swatch-wrapper'>
        <div className={imgClasses}>
          <Image src={av.testUrl} alt={av.name} />
        </div>
        <div className='fc-swatch-wrapper--name'>
          <span>{av?.name}</span>
        </div>
      </div>
    </button>
  );
});
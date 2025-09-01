import React, { useCallback } from 'react';

import './index.scss';

interface IViewMoreProps {
  label: string;
  remainingItems: number;
  onClickCallback?(event: React.MouseEvent): void;
  skeleton?: boolean;
};

export const ViewMore = (props: IViewMoreProps) => {
  const { remainingItems, label, onClickCallback } = props;

  const onClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClickCallback) {
      return onClickCallback(e);
    }
    return e;
  }, [onClickCallback]);

  return (
    <button
      type='button'
      className='fc-view-more'
      onClick={onClick}
    >
      <div className='fc-view-more--wrapper'>
        <div className='fc-view-more--wrapper--amount'>
          {`+ ${remainingItems}`}
          </div>
        <div className='fc-view-more--wrapper--name'>
          <span>{label}</span>
        </div>
      </div>
    </button>
  );
};
import { Image } from '@/components2/img';
import { Button } from '@/components2/button';
import { ICAMap } from '@/declarations/interfaces';

import './index.scss';

export function HeaderSkeleton({ alias, selectedAvName }: ICAMap) {
  return (
    <details open={false} className='yr-accordion'>
      <summary className='yr-accordion-summary'>
        <Image showSkeleton={true} alt={alias} className='yr-accordion-summary-image' />
        <div className='yr-accordion-header'>
          <h3 className={'yr-skeleton yr-accordion-header-title'}>{alias}</h3>
          <p className={'yr-skeleton yr-accordion-header-selected'}>{selectedAvName}</p>
        </div>
        <Button className='yr-skeleton' tabIndex={-1} />
      </summary>
    </details>
  );
}

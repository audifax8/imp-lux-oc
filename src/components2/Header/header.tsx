import clsx from 'clsx';

import {
  useIsCustomizerOpen,
  useIsMobile
} from '@/state/ui';

import { useGetProduct } from '@/libs/yr-react/hooks/configure';

import { Button } from '@/components2/button';
import { ArrowIcon } from '@/components2/Icons';
import { VMButton } from '@/components2/VM/VMButton';
import { RXCButton } from '@/components2/RXC/RXCButton';

import { IConfigureAPI } from '@/declarations/interfaces';

import './header.scss';

export type ISuspender = {
  read(): IConfigureAPI | null;
};

export type IHeaderProps = {
  corePromise: ISuspender; 
};

export default function Test({ corePromise }: IHeaderProps) {
  corePromise.read();

  const [isMobile] = useIsMobile();
  const [isCustomizerOpen, toggleCustomizer] = useIsCustomizerOpen();
  const product = useGetProduct();

  return (
    <header className='yr-custom-header'>
      {!isCustomizerOpen &&
        <div className={clsx('yr-header-title')}>
          <span>{product?.name}</span>
        </div>
      }
      {!isCustomizerOpen &&
        <div className='yr-buttons-section'>
          <VMButton />
          <RXCButton />
          {isMobile &&
            <Button
              variant='rounded'
              onClick={() => toggleCustomizer(true)}
            >Open menu </Button>
          }
        </div>
      }
      {isMobile && isCustomizerOpen &&
        <Button
          className='yr-header-go-back-button'
          icon={<ArrowIcon direction='right' size={24} />}
          onClick={() => toggleCustomizer(false)}
        />
      }
    </header>
  );
}

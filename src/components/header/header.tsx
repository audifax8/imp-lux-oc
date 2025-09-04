import clsx from 'clsx';

import {
  useIsCustomizerOpen,
  useIsMobile
} from '@/state/ui';

import { useGetProduct } from '@/libs/yr-react/hooks/configure';

import { Button } from '@/components/button';
import { ArrowIcon } from '@/components/Icons';
import { VMButton } from '@/components/VM/VMButton';
import { RXCButton } from '@/components/RXC/RXCButton';

import './header.scss';


export default function Test() {
//export default function Test({ corePromise }: IHeaderProps) {
  //corePromise.read();

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

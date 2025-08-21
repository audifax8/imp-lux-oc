
import { useIsCustomizerOpen, useIsMobile } from '@/state/ui';

import { useGetProduct } from '@/libs/yr-react/hooks/configure';
import { useClsxWithSkeleton } from '@/hooks/useClsxWithSkeleton';

import { Button } from '@/components/Button';
import { ArrowIcon } from '@/components/Icons';
import { VMButton } from '@/components/VM/VMButton';
import { RXCButton } from '@/components/RXC/RXCButton';

import './index.scss';

export function Header() {
  const [isMobile] = useIsMobile();
  const [isCustomizerOpen, toggleCustomizer] = useIsCustomizerOpen();
  const product = useGetProduct();
  const clsxWithSkeleton = useClsxWithSkeleton();
  const name = product?.name ?? 'TEST NAME';

  return (
    <header className='yr-custom-header'>
      {!isCustomizerOpen &&
        <div className={clsxWithSkeleton('yr-header-title')}>
          <span>{name}</span>
        </div>
      }
      {isMobile && !isCustomizerOpen &&
        <div className='yr-buttons-section'>
          <VMButton />
          <RXCButton />
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

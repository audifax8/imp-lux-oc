 import { Suspense, lazy, useState } from 'react';

import { Button } from '@/components/button';
import { TryOnIcon } from '@/components/Icons';
import { Skeleton } from '@/components/skeleton';

import { useShowSkeleton } from '@/state/ui';
import { apis } from '@/libs/apis';
import { VMAPI } from '@/libs/apis/vm-api';
import { IScriptResult } from '@/declarations/interfaces';
import { SkeletonVariant } from '@/declarations/enums';

const LazyButton = lazy(() => import('./LazyButton'));

export function VMButton() {
  const [showSkeleton] = useShowSkeleton();
  const [showLazyButtonButton, setShowButton] = useState(false);
  const [lazyError, setLazyError] = useState(false);

  const onResourceResult = (result: IScriptResult) => {
    if (!result.status) {
      setLazyError(true);
      return;
    }
    apis.initVMAPI(window.vmmv as VMAPI);
    onClick();
  };

  const onClick = async () => {
    const isBrowserSupported = await apis.vmApi.isBrowserSupported();
    console.log({ isBrowserSupported });
  };
  const buttonLabel = 'Try on';

  const skeletonButton = {
    variant: SkeletonVariant.rounded,
    style: { width: '92px', height: '32px', borderRadius: '48px' }
  };

  return (
    <>
      {!showLazyButtonButton && !lazyError && 
        <Button
          variant='rounded'
          icon={<TryOnIcon size={18} />}
          onClick={() => setShowButton(true)}
          showSkeleton={showSkeleton}
        >
          {buttonLabel}
        </Button>
      }
      {showLazyButtonButton && !lazyError &&
        <Suspense
          fallback={
            <Skeleton
              variant={skeletonButton.variant} style={skeletonButton.style}
            />
          }
        >
          <LazyButton
            variant='rounded'
            icon={<TryOnIcon size={18} />}
            onResourceResult={onResourceResult}
            onClick={() => onClick()}
          >
            {buttonLabel}
          </LazyButton>
        </Suspense>
      }
    </>
  );
}
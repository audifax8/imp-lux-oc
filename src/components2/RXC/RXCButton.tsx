 import { Suspense, lazy, useState } from 'react';

import { Button } from '@/components2/button';
import { TryLensesIcon } from '@/components2/Icons';
import { Skeleton } from '@/components2/skeleton';

import { useShowSkeleton } from '@/state/ui';
import { apis } from '@/libs/apis';
import { IRXCBaseAPI, IScriptResult } from '@/declarations/interfaces';
import { SkeletonVariant } from '@/declarations/enums';

const LazyButton = lazy(() => import('./LazyButton'));

export function RXCButton() {
  const [showSkeleton] = useShowSkeleton();
  const [showLazyButtonButton, setShowButton] = useState(false);
  const [lazyError, setLazyError] = useState(false);

  const onResourceResult = (result: IScriptResult) => {
    if (!result?.status) {
      setLazyError(true);
      return;
    }
    apis.initRXCAPI(window.RXC as IRXCBaseAPI);
    onClick();
  };

  const onClick = () => {
    apis.rxcApi.renderRxc();
  };
  const buttonLabel = 'Try Lenses';

  const skeletonButton = {
      variant: SkeletonVariant.rounded,
      style: { width: '112px', height: '32px', borderRadius: '48px' }
    };

  return (
    <>
      {!showLazyButtonButton && !lazyError && 
        <Button
          variant="rounded"
          icon={<TryLensesIcon size={18} />}
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
            variant="rounded"
            icon={<TryLensesIcon size={18} />}
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
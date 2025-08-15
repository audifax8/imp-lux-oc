 import { Suspense, lazy, useState } from 'react';

import { Button } from '@/components/Button';
import { TryLensesIcon } from '@/components/Icons';
import { useShowSkeleton } from '@/state/ui';
import { apis } from '@/libs/apis';
import { IRXCBaseAPI, IScriptResult } from '@/declarations/interfaces';

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
            <Button
              variant="rounded"
              icon={<TryLensesIcon size={18} />}
              showSkeleton={true}
            >
              {buttonLabel}
            </Button>
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
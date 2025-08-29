 import { Suspense, lazy, useState } from 'react';

import { Button } from '@/components2/button';
import { TryOnIcon } from '@/components2/Icons';

import { useShowSkeleton } from '@/state/ui';
import { apis } from '@/libs/apis';
import { VMAPI } from '@/libs/apis/vm-api';
import { IScriptResult } from '@/declarations/interfaces';

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

  return (
    <>
      {!showLazyButtonButton && !lazyError && 
        <Button
          variant="rounded"
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
            <Button
              variant="rounded"
              icon={<TryOnIcon size={18} />}
              showSkeleton={true}
            >
              {buttonLabel}
            </Button>
          }
        >
          <LazyButton
            variant="rounded"
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
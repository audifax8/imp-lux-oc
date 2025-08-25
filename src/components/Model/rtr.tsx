import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { apis } from '@/libs/apis';

import {
  useParams,
  useToken
} from '@/state/ui';
import { useRTRAPIReady, useRTRError } from '@/state/rtr';

import { IRTRBaseAPI } from '@/declarations/interfaces';

import './index.scss';

type ISuspender = {
  read(): IRTRBaseAPI | null;
};
export type IModelProps = {
  corePromise: ISuspender; 
};

export default React.memo(function RTR({ corePromise }: IModelProps) {
  corePromise.read();
  const [rtrStarted, setRTRStarted] = useState(false);
  const [token] = useToken();
  const [params] = useParams();
  const [rtrError] = useRTRError();
  const [rtrAPIReady] = useRTRAPIReady();

  useEffect(() => {
    if (params.rtrDisabled) {
      return;
    }
    if (rtrError) {
      if (params.yrEnv) {
        console.log('RTR turned off due to internal error');
      }
      apis.rtrAPI.dispose();
      return;
    }
    if (rtrAPIReady && token && rtrStarted) {
      apis.rtrAPI.setId(token);
    }
    if (rtrAPIReady && token && !rtrStarted) {
      apis.rtrAPI?.init(token);
      setRTRStarted(true);
    }
  }, [params.rtrDisabled, rtrAPIReady, token, rtrError, rtrStarted]);

  return ( 
    <section className='yr-model'>
      <div id='viewer' className={clsx('yr-model__rtr')}></div>
    </section>
  );
});

import React, { useEffect } from 'react';
import clsx from 'clsx';

import { apis } from '@/libs/apis';

import {
  useConfigureImg,
  //useIsCustomizerOpen,
  //useParams,
  useToken
} from '@/state/ui';

import {
  useRTRAPIReady,
  useRTRError,
  useTokenValid
} from '@/state/rtr';

import { getImgData } from '@/libs/helpers';

//import { getSkeletonURL } from '@/declarations/constants';
import { ISuspender } from '@/libs/main';


export type IModelProps = {
  mainAPIsPromise: ISuspender; 
};

import './model.scss';

export default React.memo(function Model({ mainAPIsPromise }: IModelProps) {
  mainAPIsPromise.read();
  const [rtrError] = useRTRError();
  const [rtrAPIReady] = useRTRAPIReady();
  const [tokenValid] = useTokenValid();

  const [token] = useToken();

  const imageData = getImgData();
  const [img] = useConfigureImg();

  useEffect(
    () => {
      if (tokenValid) {
        apis.rtrAPI.init(token);
      }
    }, [tokenValid, token]
  );

  return (
    <>
      {(!rtrError && rtrAPIReady) &&
        <div
          id='viewer'
          className={clsx('yr-model__rtr')}
        ></div>
      }
      {(rtrError) &&
        <picture
          className={clsx('yr-model__placeholder yr-image')}
          //onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          >
            <img
              fetchPriority='high'
              src={img}
              alt='Model'
              height={imageData.dimentions.height}
              width={imageData.dimentions.width}
            />
        </picture>
      }
    </>
  );
});

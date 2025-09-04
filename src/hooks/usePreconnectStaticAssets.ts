import { preconnect, PreconnectOptions } from 'react-dom';

//import { apis } from 
import { apis } from '@/libs/lazyimport';

import { getURLsToPreconnect } from '@/declarations/constants';

export const usePreconnectStaticAssets = () => {
  const params = apis.getParams();
  getURLsToPreconnect(params).forEach((url: string) => {
    if (params.yrEnv) {
      console.info('preconnecting resource: ' + url);
    }
    const options: PreconnectOptions = {
      crossOrigin: 'anonymous',
    };
    preconnect(url, options);
  });
};

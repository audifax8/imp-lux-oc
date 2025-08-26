import { preconnect } from 'react-dom';

import { apis } from '@/libs/apis';

import { getURLsToPreconnect } from '@/declarations/constants';

export const usePreconnectStaticAssets = () => {
  const params = apis.getParams();
  getURLsToPreconnect(params).forEach((url: string) => {
    if (params.yrEnv) {
      console.info('preconnecting resource: ' + url);
    }
    preconnect(url);
  });
};

import { preload, PreloadAs, PreloadOptions } from 'react-dom';

import { mapURLs } from '@/declarations/constants';

//import { apis } from '@/libs/apis';
import { apis } from '@/libs/lazyimport';
type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export const usePreloadStaticAssets = () => {
  const params = apis.getParams();
  mapURLs(params).forEach((resource) => {
    const { url } = resource;
    const options: PreloadOptions = {
      as: resource.as as PreloadAs,
      crossOrigin: resource.crossOrigin as CrossOrigin,
      fetchPriority: resource.fetchPriority
    };
    if (params.yrEnv) {
      console.info('preload resource: ' + url);
    }
    return preload(url, options);
  });
};

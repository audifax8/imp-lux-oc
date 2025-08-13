import { useEffect } from 'react';
import { preconnect } from 'react-dom';
import { apis } from '../libs/apis';

const CDN_FLUID_BASE_URL = 'https://cdn-prod.fluidconfigure.com';

export function getURLsToPreconnect(): string[] {
  const urls = [CDN_FLUID_BASE_URL, 'https://prod.fluidconfigure.com'];
  return urls;
}

export const usePreconnectStaticAssets = () => {
  const params = apis.getParams();
  useEffect(() => {
    getURLsToPreconnect().forEach((url: string) => {
      if (params.yrEnv) {
        console.info('preconnecting resource: ' + url);
      }
      preconnect(url);
    });
  }, [params]);
};

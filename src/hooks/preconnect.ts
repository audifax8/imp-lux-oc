import { useEffect } from 'react';
import { preconnect } from 'react-dom';

const CDN_FLUID_BASE_URL = 'https://cdn-prod.fluidconfigure.com';

export function getURLsToPreconnect(): string[] {
  const urls = [CDN_FLUID_BASE_URL, 'https://prod.fluidconfigure.com', 'https://cid-impl.fluidconfigure.com'];
  return urls;
}

export const usePreconnectStaticAssets = () => {
  useEffect(() => {
    getURLsToPreconnect().forEach((url: string) => {
      console.info('preconnecting resource: ' + url);
      preconnect(url);
    });
  }, []);
};

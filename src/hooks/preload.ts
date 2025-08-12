import { useEffect } from 'react';
import { preload, PreloadAs, PreloadOptions } from 'react-dom';

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export interface IResource {
  url: string;
  as: string;
  crossOrigin?: string;
  fetchPriority?: FetchPriority;
}

enum FetchPriority {
  HIGH = 'high',
  LOW = 'low',
  AUTO = 'auto'
}

const CDN_FLUID_BASE_URL = 'https://cdn-prod.fluidconfigure.com';

export function mapURLs(): IResource[] {
  const workflow = 'prod';
  const customer = '1581';
  const product = '22972';
  const locale  = 'en_US';
  const urls = [
    {
      url: `${CDN_FLUID_BASE_URL}/static/configs/3.13.0/prod/${workflow}/${customer}/product/${product}/graph-settings-${locale}.json`,
      as: 'fetch',
      fetchPriority: FetchPriority.HIGH,
      crossOrigin: 'anonymous'
    },
    {
      url: `${CDN_FLUID_BASE_URL}/static/configs/3.13.0/prod/${workflow}/${customer}/preferences.json`,
      as: 'fetch',
      fetchPriority: FetchPriority.HIGH,
      crossOrigin: 'anonymous'
    },
    {
      url: `${CDN_FLUID_BASE_URL}/static/assets/prod/${workflow}/customers/c1628/configureHtml/etc/assets/img/sk_product.png`,
      as: 'image',
      fetchPriority: FetchPriority.HIGH
    }
  ];
  return urls;
}

export const usePreloadStaticAssets = () => {
  useEffect(() => {
    mapURLs().forEach((resource) => {
      const { url } = resource;
      const options: PreloadOptions = {
        as: resource.as as PreloadAs,
        crossOrigin: resource.crossOrigin as CrossOrigin,
        fetchPriority: resource.fetchPriority
      };
      console.info('preload resource: ' + url);
      return preload(url, options);
    });
  }, []);
};

import { FetchPriority } from '@/declarations/enums';
import { IConfigureInitParams, IResource } from '@/declarations/interfaces';
import { getSkeletonResolution } from '@/libs/helpers';

export const MEGA_WAYFARER_ID = 26101;
export const RBN_CUSTOMER_ID = 1581;
export const OAK_CUSTOMER_ID = 1479;
export const WAYFARER_ID = 22972;
export const WAYFARER_VENDOR_ID = '0RB3025CP';
export const RADAR_EV_VENDOR_ID = '0OO9208CP';
export const DEFAULT_LOCALE = 'en_US';

export const API_KEYS_MAP: Record<number, string> = {
  1581: 'LUX-Ray-Ban-8taOhSR5AFyjt9tfxU',
  1479: 'O4K3L3Y78pihfgpR6R1ETlBWEAuvrnoIN2rKxqLH4FkU92tq'
};

export const BRAND_NAMES_MAP: Record<number, string> = {
  1581: 'rbn',
  1479: 'oak'
};

//RTR
const DEFAULT_RTR_VERSION = '3.1.2';
const RTR_BASE_URL = 'https://rtrmv.essilorluxottica.com';
export const RTR_URL = `${RTR_BASE_URL}/lib/v/${DEFAULT_RTR_VERSION}/main.umd.js`;
//https://rtrmv.essilorluxottica.com/lib/v/3.1.2/main.umd.js

/*const DEFAULT_RTR_VERSION = '6.0.0';
const RTR_BASE_URL = 'https://rtr-viewer.luxottica.com';
export const RTR_URL = `${RTR_BASE_URL}/lib/v/${DEFAULT_RTR_VERSION}/main.js`;*/

//VM
const DEFAULT_VM_VERSION = '4.13';
const VM_BASE_URL = 'https://vmmv.luxottica.com';
export const VM_URL = `${VM_BASE_URL}/v/${DEFAULT_VM_VERSION}/index.umd.js`;

//RXC
const DEFAULT_RXC_VERSION = '1.1.3';
const RXC_BASE_URL = 'https://rxc.luxottica.com';
export const RXC_URL = `${RXC_BASE_URL}/rxc3/fe/test/v${DEFAULT_RXC_VERSION}/dist/rxc.js`;

export const CDN_FLUID_BASE_URL = 'https://cdn-prod.fluidconfigure.com';

export const RTR_ASSETS_URL = 'https://cp.luxottica.com/public/v1/prefetch/_vendorId_?qa=_rtrQa_';

export function getHeadlessURL(params: IConfigureInitParams): string {
  const { customer, product } = params;
  const apiKey = API_KEYS_MAP[customer];
  return `https://prod-ingress.fluidconfigure.com/headless/customers/${customer}/products/${product}?apiKey=${apiKey}`;
}

export function getUPCAPI(params: IConfigureInitParams): string {
  const { customer, workflow } = params;
  const brand = BRAND_NAMES_MAP[customer];
  return `${CDN_FLUID_BASE_URL}/static/implementations/${brand}/upc/${workflow}/upc2token.json`;
}

export function getURLsToPreconnect(params: IConfigureInitParams): string[] {
  const { rtrDisabled } = params;
  const urls = [CDN_FLUID_BASE_URL, 'https://prod.fluidconfigure.com'];
  if (!rtrDisabled) {
    urls.push('https://cp.luxottica.com');
    urls.push(RTR_BASE_URL);
  }
  return urls;
}

export function getSkeletonURL(): string {
  const resolution = getSkeletonResolution();
  return `${CDN_FLUID_BASE_URL}/static/fluid-implementation-lux.s3.amazonaws.com/lux-ocp/rbn/assets/img/${resolution}_sk.png`;
}

export function mapURLs(params: IConfigureInitParams): IResource[] {
  const { workflow, customer, product, locale, rtrDisabled } = params;
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
      url: getSkeletonURL(),
      as: 'image',
      fetchPriority: FetchPriority.HIGH
    },
    {
      url: getHeadlessURL(params),
      as: 'fetch',
      fetchPriority: FetchPriority.HIGH,
      crossOrigin: 'anonymous'
    }
  ];
  if (!rtrDisabled) {
    urls.push({ url: RTR_URL, as: 'script', fetchPriority: FetchPriority.HIGH, crossOrigin: 'anonymous' });
  }
  /*if (customer === RBN_CUSTOMER_ID) {
    urls.push({
      url: 'fonts/Lato/Lato-Regular.woff2',
      as: 'font',
      fetchPriority: FetchPriority.LOW,
      crossOrigin: 'anonymous'
    });
    urls.push({
      url: 'fonts/Oswald/Oswald-Regular.woff2',
      as: 'font',
      fetchPriority: FetchPriority.LOW,
      crossOrigin: 'anonymous'
    });
    urls.push({
      url: 'fonts/Oswald/Oswald-Medium.woff2',
      as: 'font',
      fetchPriority: FetchPriority.LOW,
      crossOrigin: 'anonymous'
    });
  }*/
  return urls;
}

export const RBN_TOKEN_ALIASES = [
  'frame_sku',
  'temple_sku',
  'temple_tips_sku',
  'lenses_sku',
  'metal_sku',
  'size',
  'service_1',
  'service_2',
  'service_3'
];

export const OAK_TOKEN_ALIASES = ['ocp_rivet', 'ocp_temple_long_ref'];

export const CONFIGURE_INIT_PARAM_NAMES = [
  'customer',
  'product',
  'environment',
  'workflow',
  'locale',
  'currency',
  'number',
  'recipe'
];

//TODO
export const MOCK_RBN_MENU_ITEMS = [
  {
    name: 'Front',
    selected: 'Black',
    upcharge: null,
    img: 'https://cdn-prod.fluidconfigure.com/static/fluid-implementation-lux.s3.amazonaws.com/lux-ocp/rbn/assets/img/frame.webp'
  },
  {
    name: 'Temple',
    selected: 'Black',
    upcharge: null,
    img: 'https://cdn-prod.fluidconfigure.com/static/fluid-implementation-lux.s3.amazonaws.com/lux-ocp/rbn/assets/img/temple.webp'
  },
  {
    name: 'Lenses',
    selected: 'Green G-15',
    upcharge: '+$40.00',
    img: 'https://cdn-prod.fluidconfigure.com/static/fluid-implementation-lux.s3.amazonaws.com/lux-ocp/rbn/assets/img/lens.webp'
  }
];


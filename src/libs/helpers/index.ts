
import {
  RBN_CUSTOMER_ID,
  OAK_CUSTOMER_ID,
  WAYFARER_ID,
  DEFAULT_LOCALE,
  WAYFARER_VENDOR_ID
} from '@/declarations/constants';
import { ResolutionType } from '@/declarations/enums';
import { IConfigureInitParams, IImageData, IScriptResult } from '@/declarations/interfaces';

export function downloadScript(url: string) {
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

export function waitForScriptToLoad(
  checkTimeMs: number,
  timeOutMs: number,
  elementToCheck: string
): Promise<IScriptResult> {
  let elapsedTime = 0;
  let isInitialized: boolean | unknown = false;

  return new Promise((resolve) => {
    const time = setInterval(() => {
      elapsedTime += checkTimeMs;
      isInitialized = Object.hasOwn(window, elementToCheck);
      if (isInitialized) {
        resolve({
          time: (elapsedTime / 1000).toFixed(2) + 's',
          status: true
        });
        clearInterval(time);
      } else if (elapsedTime > timeOutMs && !isInitialized) {
        resolve({
          time: elapsedTime.toString(),
          status: false
        });
        clearInterval(time);
      }
    }, checkTimeMs);
  });
};

/*
export const resolutions: IImageData[] =
  [
    {
      resolution: ResolutionType.MOBILE,
      scale: 0.31,
      quality: 50,
      media: '(max-width:480px)',
      type: 'image/png',
      url: '',
      dimentions: {
        width: 480,
        height: 238
      }
    },
    {
      resolution: ResolutionType.TABLET,
      scale: 0.5,
      quality: 75,
      media: '(max-width:768px)',
      type: 'image/png',
      url: '',
      dimentions: {
        width: 768,
        height: 387
      }
    },
    {
      resolution: ResolutionType.DESKTOP,
      scale: 0.91,
      quality: 100,
      media: '(max-width:1400px)',
      type: 'image/png',
      url: '',
      dimentions: {
        width: 1400,
        height: 651
      }
    }
  ];
*/
export const resolutions: IImageData[] =
  [
    {
      resolution: ResolutionType.MOBILE,
      scale: 0.3,
      quality: 50,
      media: '(max-width:375px)',
      type: 'image/png',
      url: '',
      dimentions: {
        width: 375,
        height: 188
      }
    },
    {
      resolution: ResolutionType.DESKTOP,
      /*scale: 0.6,
      quality: 91,
      media: '(max-width:760px)',
      type: 'image/png',
      url: '',
      dimentions: {
        width: 760,
        height: 380
      }*/
      scale: 0.6,
      quality: 90,
      media: '(max-width:675px)',
      type: 'image/png',
      url: '',
      dimentions: {
        width: 675,
        height: 337
      }
    },
    {
      resolution: ResolutionType.TABLET,
      scale: 0.3,
      quality: 70,
      media: '(max-width:675px)',
      type: 'image/png',
      url: '',
      dimentions: {
        width: 675,
        height: 337
      }
    }
  ];

  /*
const resolutions: Record<ResolutionType, IImageData> = {
  mobile: {
    resolution: ResolutionType.MOBILE,
    scale: 0.15,
    quality: 50,
    dimentions: {
      width: 350,
      height: 170
    }
  },
  tablet: {
    resolution: ResolutionType.TABLET,
    scale: 0.3,
    quality: 70,
    dimentions: {
      width: 760,
      height: 380
    }
  },
  desktop: {
    resolution: ResolutionType.DESKTOP,
    scale: 0.6,
    quality: 91,
    dimentions: {
      width: 550,
      height: 300
    }
  }
};*/

export function getImgData(): IImageData {
  const res = getSkeletonResolution();
  //return resolutions[res] as IImageData;
  return resolutions.find(({ resolution }) => resolution === res) as IImageData;
}

export function getSkeletonResolution(): ResolutionType {
  const width = window.innerWidth;
  if (width < 768) {
    return ResolutionType.MOBILE;
  } else if (width >= 768 && width < 1024) {
    return ResolutionType.TABLET;
  }
  return ResolutionType.DESKTOP;
}

function parseBoolParam(paramToParse: string | undefined): boolean {
  if (paramToParse === undefined) {
    return false;
  }
  if (paramToParse === '') {
    return true;
  }
  return paramToParse === 'true' ? true : false;
}

function parseInt(paramToParse: string | undefined): number {
  try {
    return Number(paramToParse);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return 0;
  }
}

export function getInitQueryParams(): IConfigureInitParams {
  const qp = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(qp.entries());

  const {
    vendorId,
    workflow,
    customer,
    product,
    recipeId,
    number,
    currency,
    rtrDisabled,
    yrEnv,
    token,
    upc,
    showBackgroundImage,
    showThemeSwitch,
    darkMode,
    showHeader
  } = queryParams;
  //const e2eParam = getQueryParam('e2e')?.toLowerCase();

  return {
    locale: parseInt(customer) === OAK_CUSTOMER_ID ? 'en' : DEFAULT_LOCALE,
    environment: 'prod',
    yrEnv: parseBoolParam(yrEnv),
    rtrDisabled: rtrDisabled !== undefined ? parseBoolParam(rtrDisabled): undefined,
    customer: isNaN(parseInt(customer)) ? RBN_CUSTOMER_ID : parseInt(customer),
    product: isNaN(parseInt(product)) ? WAYFARER_ID : parseInt(product),
    recipeId: recipeId ?? undefined,
    workflow: workflow ?? 'prod',
    currency: currency,
    number: number,
    vendorId: vendorId ?? WAYFARER_VENDOR_ID,
    upc,
    token,
    showBackgroundImage: parseBoolParam(showBackgroundImage),
    showThemeSwitch: parseBoolParam(showThemeSwitch),
    darkMode: parseBoolParam(darkMode),
    showHeader: parseBoolParam(showHeader)
  };
}

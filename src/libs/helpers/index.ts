import { IScriptResult } from "@/declarations/interfaces";

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

export enum ResolutionType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}
interface IImageData {
  resolution: ResolutionType;
  scale: number;
  quality: number;

  dimentions: {
    width: number;
    height: number;
  }
}

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
      width: 1100,
      height: 550
    }
  }
};

export function getImgData(): IImageData {
  const res = getSkeletonResolution();
  return resolutions[res] as IImageData;
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
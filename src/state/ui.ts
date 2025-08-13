import { useEffect } from 'react';
import { useUIState } from '../store/UIStore';
import { Theme } from '../declarations/enums';
import { SKELETON_IMG_URL } from '../declarations/constants';

export function mapSkeletonImg(workflow: string): string {
  return SKELETON_IMG_URL.replace('_workflow_', workflow);
}

type UseTheme = [ReturnType<typeof useUIState<'theme'>>[0], (newTheme?: Theme) => void];

export const useTheme = (): UseTheme => {
  const [theme, setTheme] = useUIState('theme');
  const toggleTheme = (newTheme?: Theme) => {
    setTheme((prev) => newTheme ?? (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };
  const [params] = useUIState('params');
  useEffect(() => {
    if (params.darkMode !== undefined) {
      setTheme(params.darkMode ? Theme.DARK : Theme.LIGHT);
    }
  }, [params.darkMode, setTheme]);
  return [theme, toggleTheme];
};

type UseIsMobile = ReturnType<typeof useUIState<'isMobile'>>;

export const useIsMobile = (): UseIsMobile => {
  const [isMobile, setIsMobile] = useUIState('isMobile');
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsMobile]);
  return [isMobile, setIsMobile];
};

type UseIsCustomizerOpen = [ReturnType<typeof useUIState<'isCustomizerOpen'>>[0], (isOpen?: boolean) => void];

export const useIsCustomizerOpen = (): UseIsCustomizerOpen => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useUIState('isCustomizerOpen');
  const toggleCustomizer = (isOpen?: boolean) => {
    setIsCustomizerOpen((prev) => isOpen ?? !prev);
  };
  return [isCustomizerOpen, toggleCustomizer];
};

type UseConfigureImg = ReturnType<typeof useUIState<'configureImg'>>;

export const useConfigureImg = (): UseConfigureImg => {
  const [params] = useUIState('params');
  const [token] = useUIState('token');
  const [configureImg, setConfigureImg] = useUIState('configureImg');
  if (token === undefined) {
    return [mapSkeletonImg(params.workflow), setConfigureImg];
  }
  return [configureImg, setConfigureImg];
};

type UseToken = ReturnType<typeof useUIState<'token'>>;

export const useToken = (): UseToken => {
  const [token, setToken] = useUIState('token');
  return [token, setToken];
};

type UseShowSkeleton = ReturnType<typeof useUIState<'showSkeleton'>>;

export const useShowSkeleton = (): UseShowSkeleton => {
  const [showSkeleton, setShowSkeleton] = useUIState('showSkeleton');
  return [showSkeleton, setShowSkeleton];
};

type UseParams = ReturnType<typeof useUIState<'params'>>;

export const useParams = (): UseParams => {
  const [params, setParams] = useUIState('params');
  return [params, setParams];
};

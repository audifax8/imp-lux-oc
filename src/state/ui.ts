import { useEffect } from 'react';

import { useUIState } from '@/store/UIStore';

import { Theme } from '@/declarations/enums';

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
  const [configureImg, setConfigureImg] = useUIState('configureImg');
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
  //const [, setShowSkeleton] = useUIState('showSkeleton');
  //return [true, setShowSkeleton];
};

type UseParams = ReturnType<typeof useUIState<'params'>>;

export const useParams = (): UseParams => {
  const [params, setParams] = useUIState('params');
  return [params, setParams];
};

type UseCAS = ReturnType<typeof useUIState<'cas'>>;

export const useCAS = (): UseCAS => {
  const [cas, setCAS] = useUIState('cas');
  return [cas, setCAS];
};

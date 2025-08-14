import clsx from 'clsx';

import { useShowSkeleton } from '@/state/ui';

export const useClsxWithSkeleton = () => {
  const [showSkeleton] = useShowSkeleton();
  return (...className: Parameters<typeof clsx>) => {
    return clsx(...className, { 'yr-skeleton': showSkeleton });
  };
};

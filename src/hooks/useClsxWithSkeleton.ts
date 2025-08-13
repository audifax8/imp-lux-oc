import { useShowSkeleton } from '../state/ui';
import clsx from 'clsx';

export const useClsxWithSkeleton = () => {
  const [showSkeleton] = useShowSkeleton();
  return (...className: Parameters<typeof clsx>) => {
    return clsx(...className, { 'yr-skeleton': showSkeleton });
  };
};

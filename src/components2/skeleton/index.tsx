import clsx from 'clsx';

import { SkeletonVariant } from '@/declarations/enums';

import './index.scss';

interface ISkeletonProps {
  variant: SkeletonVariant;
  style?: React.CSSProperties
};

export function Skeleton(props: ISkeletonProps) {
  const { variant, style } = props;
  return(
    <span
      className={clsx(`yr-skeleton yr-skeleton__${variant}`)}
      style={style}
    >  
    </span>
  );
};
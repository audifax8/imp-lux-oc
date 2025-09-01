import clsx from 'clsx';

import { ISkeletonProps } from '@/declarations/interfaces';

import './index.scss';

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
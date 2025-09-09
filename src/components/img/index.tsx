import React from 'react';
import clsx from 'clsx';
import './index.scss';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & { className?: string, showSkeleton?: boolean, priority?: 'lazy' | 'eager' | undefined };

export const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  return props.showSkeleton ? (
    <div className={clsx('yr-skeleton yr-image', props.className)} />
  ) : (
    <img
      ref={ref}
      {...props}
      className={clsx('yr-image', props.className)}
      loading={props.priority || 'lazy'}
    />
  );
});

Image.displayName = 'Image';

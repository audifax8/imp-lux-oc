import clsx from 'clsx';

import { ButtonProps } from '@/declarations/enums';

import './index.scss';

export function Button(
  {
    icon,
    children,
    variant = 'rounded',
    className,
    showSkeleton,
    onClick,
    ...props
  }: ButtonProps
) {
  return (
    <button
      className={clsx('yr-button', `yr-button-${variant}`, className, {
        'yr-button-icon-only': !children && icon,
        'yr-skeleton': showSkeleton
      })}
      {...props}
      onClick={onClick}>
      {icon && <span className="yr-button-icon">{icon}</span>}
      {children}
    </button>
  );
}

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { useClsxWithSkeleton } from '@/hooks/useClsxWithSkeleton';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  children?: ReactNode;
  variant?: 'rounded' | 'square';
  className?: string;
};

export function Button({ icon, children, variant = 'rounded', className, ...props }: ButtonProps) {
  const clsxWithSkeleton = useClsxWithSkeleton();

  return (
    <button
      className={clsxWithSkeleton('yr-button', `yr-button-${variant}`, className, {
        'yr-button-icon-only': !children && icon
      })}
      {...props}>
      {icon && <span className="yr-button-icon">{icon}</span>}
      {children}
    </button>
  );
}

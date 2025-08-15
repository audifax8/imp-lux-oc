import { ButtonHTMLAttributes, ReactNode } from 'react';

export enum FetchPriority {
  HIGH = 'high',
  LOW = 'low',
  AUTO = 'auto'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum SkeletonType {
  TEXT = 'text',
  BUTTON = 'button',
  IMG = 'img'
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  children?: ReactNode;
  variant?: 'rounded' | 'square';
  className?: string;
  showSkeleton?: boolean;
  onResourceResult?: (result: boolean) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

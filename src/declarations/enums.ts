import { ButtonHTMLAttributes, ReactNode } from 'react';
import { IScriptResult } from '@/declarations/interfaces';

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
  onResourceResult?: (result: IScriptResult) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export enum RTRError {
  UPC_NOT_AVAILABLE = 'UPC_NOT_AVAILABLE'
}

export enum SkeletonVariant {
  text = 'text',
  circular = 'circular',
  rectangular = 'rectangular',
  rounded = 'rounded'
}
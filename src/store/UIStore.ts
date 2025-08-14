import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import { Theme } from '@/declarations/enums';
import { IConfigureInitParams } from '@/declarations/interfaces';

import { apis } from '@/libs/apis';
import { createStoreStateHook } from '@/libs/yr-react/store/zustand-helpers';

import { getInitQueryParams } from '@/helpers/params';

export interface IUIState {
  theme: Theme;
  isCustomizerOpen: boolean;
  isMobile: boolean;
  showSkeleton: boolean;
  token: string;
  configureImg: string;
  params: IConfigureInitParams;
}

const params = getInitQueryParams();

const INITIAL_STATE = {
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT,
  isCustomizerOpen: false,
  isMobile: window.innerWidth < 768,
  showSkeleton: true,
  token: undefined!,
  configureImg: undefined!,
  params
}

export function startUIStore() {
  apis.setParams(params);
  useUIStore.setState(INITIAL_STATE, false, 'INIT UI store');
}

export function setShowSkeleton(showSkeleton: boolean): void {
  useUIStore.setState({ showSkeleton }, false, 'Set showSkeleleton');
}

export function setTokenAndImage(token: string, configureImg: string) {
  useUIStore.setState({ configureImg, token }, false, 'Set Token & Img');
}

export function setToken(token: string) {
  useUIStore.setState({ token }, false, 'Set Token');
}

export const useUIStore = create(
  subscribeWithSelector(devtools<IUIState>(() => ({ ...INITIAL_STATE }), { name: 'UI Store' }))
);

export const useUIState = createStoreStateHook<IUIState>(useUIStore);

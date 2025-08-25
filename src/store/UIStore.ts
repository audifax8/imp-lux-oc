import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import { Theme } from '@/declarations/enums';
import { IConfigureInitParams, IMenuCA } from '@/declarations/interfaces';
import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

import { apis } from '@/libs/apis';
import { createStoreStateHook } from '@/libs/yr-react/store/zustand-helpers';

import { getInitQueryParams } from '@/libs/helpers';

export interface IUIState {
  theme: Theme;
  isCustomizerOpen: boolean;
  isMobile: boolean;
  showSkeleton: boolean;
  token: string;
  configureImg: string;
  params: IConfigureInitParams;
  cas: IMenuCA[];
}

const params = getInitQueryParams();

const INITIAL_STATE = {
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT,
  isCustomizerOpen: false,
  isMobile: window.innerWidth < 768,
  showSkeleton: true,
  token: undefined!,
  configureImg: undefined!,
  params,
  cas: MOCK_RBN_MENU_ITEMS
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

export function setCasToRender(cas: IMenuCA[]) {
  useUIStore.setState({ cas }, false, 'Set CAS');
}

export function setToken(token: string) {
  useUIStore.setState({ token }, false, 'Set Token');
}

export const useUIStore = create(
  subscribeWithSelector(devtools<IUIState>(() => ({ ...INITIAL_STATE }), { name: 'UI Store' }))
);

export function createDynamicStore(storeName: string) {
  console.log(storeName);
}

export const useUIState = createStoreStateHook<IUIState>(useUIStore);

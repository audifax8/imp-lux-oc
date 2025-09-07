import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import { Theme } from '@/declarations/enums';
import { IConfigureInitParams, IImageData, IMenuCA } from '@/declarations/interfaces';
import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

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
  initialLoad: boolean;
  imgs: IImageData[],
  viewName: string
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
  cas: MOCK_RBN_MENU_ITEMS,
  initialLoad: true,
  imgs: [],
  viewName: 'FFL'
}

export function loadDefaultUIStore() {
  useUIStore.setState(INITIAL_STATE, false, 'Default UI store');
}

export function startInitialStore(
  token: string,
  configureImg: string,
  cas: IMenuCA[],
  showSkeleton: boolean,
  initialLoad: boolean,
  imgs: IImageData[],
  viewName: string
) {
  useUIStore.setState({
    token,
    configureImg,
    cas,
    showSkeleton,
    initialLoad,
    imgs,
    viewName
  }, false, 'Start UI Store');
};

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

export function reloadPagination(menuCa: IMenuCA) {
  const currentCas = useUIStore.getState().cas;
  const newCas = currentCas.map((menu) => {
    if (menu.alias === menuCa.alias) {
      return menuCa;
    }
    return menu;
  });
  useUIStore.setState({ cas: newCas }, false, 'Update pagination menu: ' + menuCa.alias);
}

export const useUIState = createStoreStateHook<IUIState>(useUIStore);

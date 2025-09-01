import { create, StoreApi } from 'zustand';
import { createStoreStateHook } from './zustand-helpers';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import { IConfigureAPI } from '@/declarations/interfaces';

export interface IConfigureState {
  apiReady: boolean;
  recipe: unknown;
}

const INITIAL_STATE: IConfigureState = {
  apiReady: false,
  recipe: {}
};

/** Store Hook */
export const useConfigureStore = create(
  subscribeWithSelector(devtools<IConfigureState>(() => ({ ...INITIAL_STATE }), { name: 'Configure' }))
);

/** Store Selectors */
export const useConfigureState = createStoreStateHook(useConfigureStore);
export type ConfigureStore = StoreApi<IConfigureState>;
export type ConfigureCallback = (error: Error, configure: IConfigureAPI) => void;

export function setAPIReady(apiReady: boolean, recipe: unknown) {
  useConfigureStore.setState({ apiReady, recipe }, false, 'Set API ready && Recipe');
}

export const startConfigureStore = () => {
  useConfigureStore.setState(INITIAL_STATE, false, 'INIT Configure store');
};

// TODO ADD MORE INIT LOGIC
export function destroyConfigure() {
  //apis?.destroyAPIs();
  useConfigureStore.setState(INITIAL_STATE, false, 'Destroyed Configure Store');
}

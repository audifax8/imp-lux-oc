import { create, StoreApi } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import { apis } from '@/libs/apis';
import { RtrAPI } from '@/libs/apis/rtr-api';
import { createStoreStateHook } from '@/libs/yr-react/store/zustand-helpers';

import { IConfigureAPI, IRTRBaseAPI, IVMBaseAPI } from '@/declarations/interfaces';
import { VMAPI } from '@/libs/apis/vm-api';

export interface IAPIsState {
  rtrRendered?: boolean;
  rtrApiReady: boolean;
  rtrError: string;
  rtrDisabled: boolean;
}

const INITIAL_STATE: IAPIsState = {
  rtrRendered: false,
  rtrApiReady: false,
  rtrError: undefined!,
  rtrDisabled: false
};

export function setRTRError(rtrError: string) {
  useAPIsStore.setState({ rtrError }, false, 'Set RTR error');
}

export function setRTRDisabled(rtrDisabled: boolean) {
  useAPIsStore.setState({ rtrDisabled }, false, 'Set RTR Disabled');
}

export function startAPIs(configure: IConfigureAPI) {
  apis.initLuxApi(configure);
  apis.initAssetsWorkers();
}

export function startRTR() {
  const rtrAPI = new RtrAPI(window.rtrViewerMV as IRTRBaseAPI);
  apis.initRTRAPI(rtrAPI);
  useAPIsStore.setState({ rtrApiReady: true }, false, 'Start RTR');
}

export function startVM() {
  const vmAPI = new VMAPI(window.vmmv as IVMBaseAPI);
  apis.initVMAPI(vmAPI);
}

/** Store Hook */
export const useAPIsStore = create(
  subscribeWithSelector(devtools<IAPIsState>(() => ({ ...INITIAL_STATE }), { name: 'APIs' }))
);

/** Store Selectors */
export const useAPIsState = createStoreStateHook(useAPIsStore);

export type APIsStore = StoreApi<IAPIsState>;

export function destroyAPIs() {
  useAPIsStore.setState(INITIAL_STATE, false, 'Destroyed APIs');
}

import { AssetsWorker } from '@/workers/asset-manager';
import { IConfigureAPI, IConfigureInitParams, IRXCBaseAPI } from '@/declarations/interfaces';
import { API_KEYS_MAP, getHeadlessURL, getUPCAPI, OAK_CUSTOMER_ID } from '@/declarations/constants';

import { RtrAPI } from '@/libs/apis/rtr-api';
import { VMAPI } from '@/libs/apis/vm-api';
import { LuxBaseAPI, OakCustomAPI, RbnCustomAPI } from '@/libs/apis/lux-api';
import { RxcAPI } from './rxc-api';

export class APIs {
  params: IConfigureInitParams = undefined!;
  rtrAPI: RtrAPI = undefined!;
  vmApi: VMAPI = undefined!;
  rxcApi: RxcAPI = undefined!;
  assetsWorker: AssetsWorker = undefined!;
  luxAPI: LuxBaseAPI = undefined!;
  configureCore: IConfigureAPI = undefined!;

  constructor() {}

  setParams(params: IConfigureInitParams): void {
    this.params = params;
  }

  getParams(): IConfigureInitParams {
    return this.params;
  }

  initLuxApi(configure: IConfigureAPI): void {
    const { customer } = this.params;
    this.luxAPI = customer === OAK_CUSTOMER_ID ? new OakCustomAPI() : new RbnCustomAPI();
    this.luxAPI.setCore(configure);
    this.configureCore = configure;
  }

  initAssetsWorkers(): void {
    const url = this.getRTRAssetsURL();
    this.assetsWorker = new AssetsWorker(this.params, url);
    this.assetsWorker.downloadAssets([getHeadlessURL(this.params)], 'Product Headless');
    if (this.params.upc) {
      this.assetsWorker.downloadAssets([getUPCAPI(this.params)], 'upc2Token');
    }
  }

  initRTRAPI(rtrApi: RtrAPI): void {
    this.rtrAPI = rtrApi;
  }

  initVMAPI(vmApi: VMAPI): void {
    this.vmApi = vmApi;
  }

  initRXCAPI(rxcApi: IRXCBaseAPI): void {
    this.rxcApi = new RxcAPI(rxcApi);
  }

  getRTRAssetsURL(): string {
    return this.luxAPI.getAssetsURL(this.params);
  }

  getImg(): string {
    const { customer } = this.params;
    const apiKey = API_KEYS_MAP[customer];
    return this.luxAPI?.getProductImg(apiKey ?? '') ?? '';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRecipe(changes: any[]) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.configureCore.setRecipe(changes, (e: any, c: any) => {
        if (e) {
          return reject(e);
        }
        return resolve(c);
      });
    });
  }

  destroyAPIs(): void {
    this.configureCore?.destroy();
    this.assetsWorker?.destroy();
    this.luxAPI?.destroy();
    this.rtrAPI?.destroy();
  }
}

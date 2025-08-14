import { IConfigureAPI, IConfigureInitParams } from '../../declarations/interfaces';
import { API_KEYS_MAP, getComponentsURL, getHeadlessURL, getUPCAPI, OAK_CUSTOMER_ID } from '../../declarations/constants';
import { RtrAPI } from './rtr-api';
//import { API_KEYS_MAP, getHeadlessURL, OAK_CUSTOMER_ID, getUPCAPI } from '@/declarations/constants';
import { LuxBaseAPI, OakCustomAPI, RbnCustomAPI } from './lux-api';
import { AssetsWorker } from '../../workers/asset-manager';

class APIs {
  params: IConfigureInitParams = undefined!;
  rtrAPI: RtrAPI = undefined!;
  assetsWorker: AssetsWorker = undefined!;
  luxAPI: LuxBaseAPI = undefined!;
  configureCore: IConfigureAPI = undefined!;

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
    const vendorId = this.configureCore.getProduct().vendorId;
    const componentsHeaders = new Headers();
    componentsHeaders.append('Ocp-Apim-Subscription-Key', 'c17dfca82cc14819a4e2b600667c0123');
    componentsHeaders.append('Accept', 'application/json');
    componentsHeaders.append('OC-Id', '1ff9e4f3-293e-425d-b17e-4a5cc5578d0b');
    componentsHeaders.append('OC-Country', 'US');
    componentsHeaders.append('Cache-Control', 'no-cache');
    this.assetsWorker.downloadAssets([getComponentsURL(vendorId)], 'Components', true);
    if (this.params.upc) {
      this.assetsWorker.downloadAssets([getUPCAPI(this.params)], 'upc2Token');
    }
  }

  initRTRAPI(rtrApi: RtrAPI): void {
    this.rtrAPI = rtrApi;
  }

  getRTRAssetsURL(): string {
    return this.luxAPI.getAssetsURL(this.params);
  }

  getImg(): string {
    const { customer } = this.params;
    const apiKey = API_KEYS_MAP[customer];
    return this.luxAPI?.getProductImg(apiKey ?? '') ?? '';
  }

  destroyAPIs(): void {
    this.configureCore?.destroy();
    this.assetsWorker?.destroy();
    this.luxAPI?.destroy();
    this.rtrAPI?.destroy();
  }
}

export const apis = new APIs();

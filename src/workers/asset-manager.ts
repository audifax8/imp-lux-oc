//import { useConfigureStore } from '@/libs/yr-react/store/ConfigureStore';
//import { IConfigureInitParams, IRTRAssetsAPI } from '@/declarations/interfaces';

import { IConfigureInitParams, IRTRAssetsAPI } from "../declarations/interfaces";
import { setToken } from "../store/UIStore";
//import { useConfigureStore } from "../libs/yr-react/store/ConfigureStore";

export class AssetsWorker {
  worker: Worker = undefined!;
  params: IConfigureInitParams;
  assetsURL: string;
  assets: IRTRAssetsAPI = {};
  workers: Worker[] = [];

  constructor(params: IConfigureInitParams, assetsURL: string) {
    this.params = params;
    this.assetsURL = assetsURL;
    const { rtrDisabled, yrEnv } = params;
    if (rtrDisabled) {
      if (yrEnv) {
        console.log('RTR Disabled');
      }
      return;
    }
    this.worker = new Worker(new URL('./rtr-assets', import.meta.url), { type: 'module' });
    this.worker.onmessage = (event: MessageEvent) => {
      const { data } = event;
      this.assets = data;
      if (yrEnv) {
        console.log('[WEB WORKER] RTR assets result: ');
        console.log(data);
      }

      const prefetchListStartup: string[] = data.prefetchListStartup;
      this.downloadAssets(prefetchListStartup, 'prefetchListStartup');
    };
    this.worker.postMessage({ params, assetsURL });
  }

  downloadAssets(assetsToDownload: string[], assetDescription?: string): void {
    const { upc, yrEnv } = this.params;
    const worker = new Worker(new URL('./download-asset', import.meta.url), { type: 'module' });
    worker.onmessage = (event: MessageEvent) => {
      const { data } = event;
      if (yrEnv) {
        console.log(assetDescription);
        console.log('[WEB WORKER] asset result: ');
        console.log(data);
      }
      if (upc && data?.[upc]) {
        setToken(data?.[upc]?.token);
      }
    };
    worker.postMessage({ assetsToDownload, params: this.params, assetDescription });
    this.workers.push(worker);
  }

  destroy(): void {
    const { yrEnv } = this.params;
    if (yrEnv) {
      console.log('destroying workers');
    }
    this.worker?.terminate();
    this.workers.forEach((worker) => worker.terminate());
    this.params = undefined!;
    this.assets = undefined!;
    this.assetsURL = undefined!;
  }
}

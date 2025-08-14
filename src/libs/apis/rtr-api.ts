/* eslint-disable */
import {
  IRTR_API,
  IRTRBaseAPI,
  KeyValueString,
  KeyValueNumber,
  IInitRTRPayload
} from '@/declarations/interfaces';
import { waitForScriptToLoad } from '@/libs/helpers';
export class RtrAPI implements IRTR_API {
  /* Lux rtr API */
  api: IRTRBaseAPI;
  constructor(api: IRTRBaseAPI) {
    this.api = api;
  }

  destroy(): void {
    this.api = undefined!;
  }

  getVersion(): any {
    return this.api.getVersion();
  }

  async isInitialized(): Promise<boolean> {
    return await this.api?.isInitialized();
  }

  async isIdAvailable(token: string): Promise<any> {
    const dataToCheck = {
      type: 'token',
      value: token
    };

    const envParams = {
      envs: {
        ms: 'production',
        catalog: 'production',
        asset: 'production'
      },
      qa: false
    };
    return await this.api.isIdAvailable(dataToCheck, envParams);
  }

  setId(token: string): void {
    this.api.setId({
      type: 'token',
      value: token
    });
  }

  init(token: string, cb?: Function): any {
    const initData: IInitRTRPayload = {
      data: {
        settings: {
          env: 'PROD',
          orbitPoint: false,
          highlightComponent: true,
          overviewVisibility: false,
          displayComponentPointer: true,
          automaticFramingComponent: true,
          buttonsVisibility: {
            tutorial: 'hidden',
            explosion: 'overlay',
            accessibility: 'overlay',
            animationAtLanding: 'overlay'
          }
        },
        id: {
          type: 'token',
          value: token
        },
        locale: 'en-US', // or any other available locale
        selector: '#viewer'
      },
      metadata: {
        envs: {
          asset: 'production',
          catalog: 'production',
          ms: 'production'
        },
        qa: false
      },
      callbacks: {
        onComponentSelected: () => {},
        onActions: () => {
          // one of the possible actions is "click" that will contains the
          // selected component slot in the token. When the user clicks on a
          // configurable part, then the camera frames the clicked component
          // provided that highlightComponentPart has been set to true
        }
      }
    };
    this.api?.init(initData);

    if (cb) {
      return waitForScriptToLoad(100, 20000, 'rtrViewerMV')
        .then((e) => cb(null, e))
        .catch((err) => cb(err, null));
    }
  }

  selectComponent(componentId: number): void {
    this.api.selectComponent({ componentId });
  }

  mapCaNameToRTRCameraName(caAlias: string): string {
    const ALIAS_RTR_ON_COMPONENT_SELECT: KeyValueString = {
      lenses_sku: 'lenses',
      polarized: 'lenses',
      lenses_category: 'lenses',
      prescription: 'lenses',
      lenses_options: 'lenses',
      frame_sku: 'frame',
      metal_details: 'frame',
      matrial: 'frame',
      temple_sku: 'temple',
      temple_tips_category: 'temple_tips',
      temple_tips_sku: 'temple_tips'
    };
    return ALIAS_RTR_ON_COMPONENT_SELECT[caAlias] || '';
  }

  mapCameraNameRTRToComponent(caAlias: string): number | undefined {
    const aliasMapped = this.mapCaNameToRTRCameraName(caAlias);
    const COMPONENTS_TOKEN_MAP: KeyValueNumber = {
      frame: 0,
      temple: 1,
      temple_tips: 2,
      lenses: 3
    } as any;
    return COMPONENTS_TOKEN_MAP[aliasMapped];
  }
}

/* eslint-disable */
import {
  IRTRAPI,
  IRTRBaseAPI,
  KeyValueString,
  KeyValueNumber,
  IInitRTRPayload,
  IConfigureInitParams,
  ScriptType
} from '@/declarations/interfaces';
import { getInitQueryParams, waitForScriptToLoad } from '@/libs/helpers';
import { setRTRDisabled, setRTRError, startAPIsInitialStore } from '@/store/APIsStore';
import { apis } from '../lazyimport';

const { yrEnv, rtrDisabled } = getInitQueryParams() as IConfigureInitParams;

export class RtrAPI implements IRTRAPI {
  /* Lux rtr API */
  api!: IRTRBaseAPI;
  lastTokenRendered: string;
  rtrDisabled!: boolean;
  lastComponentSelected!: number;
 
  constructor() {
    this.lastTokenRendered = '';
    this.rtrDisabled = this.isRTRDisabled();
    if (this.rtrDisabled) {
      setRTRDisabled(true);
      return;
    }
    if (window.rtrViewerMV) {
      this.api = window.rtrViewerMV as IRTRBaseAPI;
      Promise.resolve().then(() => {
        setTimeout(async () => this.render(), 0);
        console.log('render 0');
      });
    } else {
      waitForScriptToLoad(100, 20000, 'rtrViewerMV')
        .then((e: ScriptType) => {
          if (!e.status) {
            if (yrEnv) {
              console.log('RTR error');
            }
            return;
          }
          this.api = window.rtrViewerMV as IRTRBaseAPI;
          Promise.resolve().then(() => {
            setTimeout(async () => this.render(), 0);
            console.log('render 1');
          });
        })
        .catch((err) => {
          if (yrEnv) {
            console.log('RTR error');
            console.error(err);
          }
        });
    }
    setRTRDisabled(this.rtrDisabled);
  }

  async render(): Promise<any> {
    return new Promise(() => {
      if (this.rtrDisabled) {
        return;
      }
      const token = apis.luxAPI.getToken();
      this.isIdAvailable(token).then((isValidToken: boolean) => {
        console.log({isValidToken});
        if (!isValidToken) {
          startAPIsInitialStore(
            true,
            true,
            isValidToken,
            'Invalid token'
          );
          return;
        }
        this.init(token);
        this.lastTokenRendered = token;
        startAPIsInitialStore(
          false,
          true,
          isValidToken,
          ''
        );
      });
    });
  };

  getCookie(cookieKey: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const cooKeyValue = cookie.split('=');
      if (cooKeyValue[0].replace(' ', '') === cookieKey) {
        try {
          return JSON.parse(cooKeyValue[1]);
        } catch {
          return cooKeyValue[1];
        }
      }
    }
    return null;
  }

  isRTRDisabled(): boolean {
    const rtrCookie = this.getCookie('rtr-exp');
    if (rtrCookie === true || rtrCookie === false) {
      if (yrEnv) {
        console.info(`RTR: ${rtrCookie ? 'enabled' : 'disabled'} by cookie`);
      }
      return rtrCookie;
    }

    if (rtrDisabled !== undefined) {
      if (yrEnv) {
        console.info(`RTR: ${rtrDisabled ? 'disabled' : 'enabled'} by URL param`);
      }
      return rtrDisabled;
    }

    const product = apis.configureCore.getProduct();
    const productFacets = product.facets;
    const rtrFacet = productFacets.RTR_VIEWER;
    if (!rtrFacet || rtrFacet[0] !== 'ENABLED') {
      if (yrEnv) {
        console.info(`RTR: disabled by product facet`);
      }
      return true;
    }
    return false;
  };

  async handleTokenChange(token: string): Promise<void> {
    if (!token || !this.api) { return; }
    const isTokenValid = await this.isIdAvailable(token);
    const isRTROn = await this.isInitialized();
    if (!isRTROn && isTokenValid) {
      this.lastTokenRendered = token;
      return this.init(token);
    }

    const isSameToken = this.lastTokenRendered === token;
    if (isRTROn && isTokenValid && !isSameToken) {
      this.setId(token);
      this.lastTokenRendered = token;
      return;
    }

  }

  dispose(): void {
    this.api.dispose();
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
        },
        onClose: (e: any) => {
          console.log('[RTR] onClose cb');
          console.log(e);
            /* ... */
        },
        onError: (e: any) => {
          console.log('[RTR] onError cb');
          console.log(e);
          //Close RTR
          this.api.dispose();
          setRTRDisabled(true);
          setRTRError(e?.code);
        },
        onFocus: (detail: any) => {
          console.log('[RTR] onFocus cb');
          console.log(detail);
        },
        onRendered: (e: any) => {
          console.log('[RTR] onRender cb');
          console.log(e);
        },
        onSettingsUpdated: (detail: any) => {
          console.log('[RTR] onSettingsUpdated cb');
          console.log(detail);
        },
        onWarning: (detail: any) => {
          console.log('[RTR] onWarning cb');
          console.log(detail);
        },
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
    if (componentId === this.lastComponentSelected) {
      return;
    }
    this.api?.selectComponent({ componentId });
    this.lastComponentSelected = componentId;
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

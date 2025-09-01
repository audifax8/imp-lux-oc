import { FetchPriority, SkeletonVariant } from '@/declarations/enums';

export interface IConfigureState {
  /** Configure API instance */
  configure: IConfigureAPI;
  product: IProduct;
  token: string;
}

export interface ICAMap {
  id: number | null;
  name?: string;
  alias: string;
  icon: string;
  //ca: IConfigurableAttribute | null;
  selectedAvId: number | null;
  skeleton?: boolean;
  selectedAvName?: string;
  open?: boolean;
};
export interface IMenuCA {
  id: number;
  alias: string;
  caName: string;
  icon: string;
  selectedAvId: number | null;
  selectedAvName: string;
  avs: IAttributeValue[];
  open: boolean;
  avsLenght: number;
  currentPage: number;
  skeleton?: boolean;
};

export interface IMenuPagination {
  avs: IAttributeValue[];
  currentPage: number;
  avsLenght: number;
};
export interface IMenu {
  cas: IMenuCA[];
}
export interface IConfigureAPI {
  product: { id: number };
  getProduct(): IProduct;
  getProductName(): string;
  getAttributeByAlias(alias: string): IConfigurableAttribute;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRecipe(format: string, option1?: string, option2?: string): any;
  getAttribute(options: unknown): IConfigurableAttribute;
  getSelectedAV(alias: string): IAttributeValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFcParams(): any;
  destroy(): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRecipe(changes: any[], cb: any): any[];
}
export interface IConfigureInitParams {
  /**  Customer ID. */
  customer: number;
  /** Product ID. */
  product: number;
  /**  The environment to use for configurations and services. The default is "prod". */
  environment?: string;
  /** The workflow from which to load configurations. The default is "prod". */
  workflow: string;
  /** The locale to use for this instance. The defaults is "en_us". You must have localization defined for this locale. */
  locale?: string;
  currency?: string;
  number?: string;
  /** Load the configurator with this recipe ID. If omitted, a blank recipe will be used with default values for each attribute. */
  recipe?: number;
  recipeId?: string;
  yrEnv?: boolean;
  vendorId?: string;
  rtrDisabled?: boolean;
  token?: string;
  upc?: string;
  showBackgroundImage?: boolean;
  showThemeSwitch?: boolean;
  darkMode?: boolean;
  showHeader?: boolean;
}

export interface IConfigurableAttribute {
  id: number;
  alias: string;
  vendorId: string;
  name: string;
  values: IAttributeValue[];
  metadata: KeyValueString[];
  allFacets: ICAFacet[];
}
export interface IProduct {
  name: string;
  id: number;
  vendorId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  facets: any;
  defaultViewName: string;
  environment: string;
  customerId: number;
  workflow: string;
}

export interface IAttributeValue {
  active: boolean;
  selected: boolean;
  selectable: boolean;
  id: number;
  url?: string;
  vendorId: string;
  alias: string;
  name: string;
  metadata: KeyValueString[];
  facets: IAVFacet;
  testUrl?: string;
}

export interface IFacetFacetValueMap {
  id?: number;
  name?: string;
  facetValuesMapped?: IFacetValue;
}

export interface ICAFacet {
  name: string;
  id: number;
  facetValues: IFacetValue[];
}

export type IAVFacet = Record<string, number[]>;

export interface IFacetValue {
  id: number;
  name: string;
  selectable: boolean;
}

export interface IRTRAssetsAPI {
  prefetchListStartup?: string[];
  prefetchListConfigurableAttributes?: { [key: string]: string[] };
  prefetchListHierarchy?: { [key: string]: string[] };
}

export interface IResource {
  url: string;
  as: string;
  crossOrigin?: string;
  fetchPriority?: FetchPriority;
}

export interface IRTRBaseAPI {
  getVersion(): string;
  init(payload: IInitRTRPayload): void;
  isIdAvailable(dataToChekPayload: ITokenPayload, envPayload: IEnvPayload): Promise<boolean>;
  setId(setIdPayload: ITokenPayload): void;
  isInitialized(): Promise<boolean>;
  selectComponent(payload: ISelectComponentPayload): void;
  dispose(): void;
}
export interface IRTRAPI {
  getVersion(): string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init(token: string, cb?: any): void;
  isIdAvailable(token: string): Promise<boolean>;
  setId(token: string): void;
  selectComponent(token: number): void;
  mapCameraNameRTRToComponent(caName: string): number | undefined;
  mapCaNameToRTRCameraName(caAlias: string): string;
  isInitialized(): Promise<boolean>;
  dispose(): void;
}

export interface IVMBaseAPI {
  VMConfiguratorsWidget(): void;
  VMWidgetApp(): void;
  clearPictureVideoIds(): void;
  VMWidgetQRCode(): void;
  isBrowserSupported(): Promise<boolean>;
  isUPCSupported(): void;
  isValidConfig(): void;
  reset(): void;
  warmUp(): void;
}
export interface IVMAPI {
  VMConfiguratorsWidget(): void;
  VMWidgetApp(): void;
  clearPictureVideoIds(): void;
  VMWidgetQRCode(): void;
  isBrowserSupported(): Promise<boolean>;
  isUPCSupported(): void;
  isValidConfig(): void;
  reset(): void;
  warmUp(): void;
}

export interface IRXCAPI {
  close(): void;
}

export interface IRXCBaseAPI {
  rxcWidget: {
    close(): void;
    listeners: {
      AddToCartEvent(): void;
      BackToPdp(): void;
      LoadPrescription(): void;
    };
    new(): void;
    roots: {
      '#rxcApp': HTMLElement;
    };
    selector: string;
  };
}

interface ITokenPayload {
  type: string;
  value: string;
}

interface ISelectComponentPayload {
  componentId: number;
}

interface IEnvPayload {
  envs: {
    ms: string;
    catalog: string;
    asset: string;
  };
  qa: boolean;
}

export interface IInitRTRPayload {
  data: {
    settings: {
      env: string;
      orbitPoint: boolean;
      highlightComponent: boolean;
      overviewVisibility: boolean;
      displayComponentPointer: boolean;
      automaticFramingComponent: boolean;
      buttonsVisibility: {
        tutorial: string;
        explosion: string;
        accessibility: string;
        animationAtLanding: string;
      };
    };
    id: ITokenPayload;
    locale: string; // or any other available locale
    selector: string;
  };
  metadata: IEnvPayload;
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onComponentSelected: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onActions: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFocus: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRendered: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSettingsUpdated: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onWarning: any;
  };
}

export type KeyValueString = Record<string, string>;

export type KeyValueNumber = Record<string, number>;
export interface IBaseLuxAPI {
  getProductVendorId(product: IProduct): string;
  getVendorIDSize(params: IConfigureInitParams): string;
  getAssetsURL(params: IConfigureInitParams): string;
  mapCas(): IMenuCA[];
  reloadPagination(menu: IMenuCA): IMenuCA;
  getAttributeByAlias(alias: string): IConfigurableAttribute;
  getSwatchURL(av: IAttributeValue, caName: string): string;
}
export interface IScriptResult {
  time: string;
  status: boolean;
}

export interface ISkeletonProps {
  variant: SkeletonVariant;
  style?: React.CSSProperties
};
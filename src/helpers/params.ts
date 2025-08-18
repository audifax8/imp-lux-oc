import {
  RBN_CUSTOMER_ID,
  OAK_CUSTOMER_ID,
  WAYFARER_ID,
  DEFAULT_LOCALE,
  WAYFARER_VENDOR_ID
} from '@/declarations/constants';
import { IConfigureInitParams } from '@/declarations/interfaces';

function parseBoolParam(paramToParse: string | undefined): boolean {
  if (paramToParse === undefined) {
    return false;
  }
  if (paramToParse === '') {
    return true;
  }
  return paramToParse === 'true' ? true : false;
}

function parseInt(paramToParse: string | undefined): number {
  try {
    return Number(paramToParse);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return 0;
  }
}

export function getInitQueryParams(): IConfigureInitParams {
  const qp = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(qp.entries());

  const {
    vendorId,
    workflow,
    customer,
    product,
    recipeId,
    number,
    currency,
    rtrDisabled,
    yrEnv,
    token,
    upc,
    showBackgroundImage,
    showThemeSwitch,
    darkMode,
    showHeader
  } = queryParams;
  //const e2eParam = getQueryParam('e2e')?.toLowerCase();

  return {
    locale: parseInt(customer) === OAK_CUSTOMER_ID ? 'en' : DEFAULT_LOCALE,
    environment: 'prod',
    yrEnv: parseBoolParam(yrEnv),
    rtrDisabled: parseBoolParam(rtrDisabled),
    customer: isNaN(parseInt(customer)) ? RBN_CUSTOMER_ID : parseInt(customer),
    product: isNaN(parseInt(product)) ? WAYFARER_ID : parseInt(product),
    recipeId: recipeId ?? undefined,
    workflow: workflow ?? 'prod',
    currency: currency,
    number: number,
    vendorId: vendorId ?? WAYFARER_VENDOR_ID,
    upc,
    token,
    showBackgroundImage: parseBoolParam(showBackgroundImage),
    showThemeSwitch: parseBoolParam(showThemeSwitch),
    darkMode: parseBoolParam(darkMode),
    showHeader: parseBoolParam(showHeader)
  };
}

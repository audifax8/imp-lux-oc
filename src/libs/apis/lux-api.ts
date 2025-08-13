/* eslint-disable */
import { IConfigureAPI, IConfigureInitParams, IProduct, IBaseLuxAPI } from '../../declarations/interfaces';
import { RBN_TOKEN_ALIASES, OAK_TOKEN_ALIASES, RTR_ASSETS_URL } from '../../declarations/constants';

export abstract class LuxBaseAPI implements IBaseLuxAPI {
  coreService: IConfigureAPI = undefined!;

  constructor() {}

  abstract getToken(): string;

  destroy(): void {
    this.coreService?.destroy();
  }

  setCore(coreService: IConfigureAPI): void {
    this.coreService = coreService;
  }

  getProductVendorId(product: IProduct): string {
    const facets = product.facets;
    const productFacet = facets.Product;
    if (productFacet && productFacet[0]) {
      return productFacet[0];
    }
    const modelCode = facets.modelCode;
    if (modelCode && modelCode[0]) {
      return modelCode[0];
    }
    return '';
  }

  getVendorIDSize(params: IConfigureInitParams): string {
    const { yrEnv, vendorId } = params;
    const product = this.coreService.getProduct();
    const modelVendorId = this.getProductVendorId(product);
    let size;
    try {
      const sizeCA = this.coreService.getAttribute({ alias: 'size' });
      const selectedSize = sizeCA.values.find((av) => av.selected);
      const SIZE_REGEX = new RegExp('[a-zA-Z0-9]*[s]*?([0-9]{2})');
      size = SIZE_REGEX.exec(selectedSize?.vendorId || '');
      if (!size) {
        const productFacets = product.facets;
        if (productFacets.product_size && productFacets.product_size[0]) {
          size = productFacets.product_size;
        }
      }
    } catch (err) {
      if (yrEnv) {
        console.log('Product does not have size C.A.');
      }
      const productFacets = product.facets;
      if (productFacets.product_size && productFacets.product_size[0]) {
        size = productFacets.product_size;
      }
    }
    const modelCodeSize = size && size.length ? `${modelVendorId + size[0]}` : modelVendorId;

    return modelCodeSize || vendorId || '';
  }

  getAssetsURL(params: IConfigureInitParams): string {
    const { workflow, yrEnv, rtrDisabled } = params;
    if (rtrDisabled) {
      return '';
    }
    const rtrVendorId = this.getVendorIDSize(params);
    const rtrQa = workflow !== 'prod';
    const assetsURL = RTR_ASSETS_URL.replace('_vendorId_', rtrVendorId).replace('_rtrQa_', rtrQa.toString());
    if (yrEnv) {
      console.log('URL to download RTR Assets:', assetsURL);
    }
    return assetsURL;
  }

  getProductImg(apiKey: string): string {
    const isMobile = false;
    const conciseRecipe = this.coreService.getRecipe('legacyConcise');
    const uriRecipe = encodeURI(conciseRecipe);
    const { id, defaultViewName, environment, workflow, customerId } = this.coreService.getProduct();
    const format = 'png';
    const quality = '50';
    const sacale = isMobile ? '0.2' : '0.5';
    const baseURL = `https://prod.fluidconfigure.com/imagecomposer/generate/?view=${defaultViewName}&apiKey=${apiKey}&workflow=${workflow}&environment=${environment}&customerId=${customerId}&productId=${id}&purpose=serverDisplay&format=${format}&trim=false&padding=0&scale=${sacale}&binary=true&quality=${quality}&backgroundColor=%23f6f6f6ff&recipe=${uriRecipe}`;
    return baseURL;
  }
}

export class OakCustomAPI extends LuxBaseAPI {
  constructor() {
    super();
  }

  getToken(): string {
    const consoleCSS = 'background: #f5f785; color: black; padding: 5px; font-weight: 700;';
    const recipe = this.coreService.getRecipe('custom', 'alias', 'vendorId');
    const productFacets = this.coreService.getProduct().facets;
    const productSize = productFacets.product_size;
    const productModelCode = productFacets.modelCode[0];
    const params = this.coreService.getFcParams();
    let tokenSequence = productFacets.token_sequence ? productFacets.token_sequence[0] : null;
    const tokenArray = [];
    let tokenAliasesOrder = [];

    const mappingSequenceToken = (recipe: any, tokenSequence: string) => {
      OAK_TOKEN_ALIASES.map((alias) => {
        if (recipe[alias + '_retail'] && tokenSequence.includes(alias)) {
          tokenSequence = tokenSequence.replace(alias, alias + '_retail');
        }
      });
      return tokenSequence;
    };

    tokenSequence = mappingSequenceToken(recipe, tokenSequence);

    if (tokenSequence) {
      // In case that we receive the token sequence order by product facet
      tokenAliasesOrder = tokenSequence.split(':');
    } else {
      // The model has not a components order defined to token creation by product facet
      if (params.fluidEnv) {
        console.log('%cMissing "token_sequence" in product facet.', consoleCSS);
      }
      return '';
    }

    tokenAliasesOrder.forEach((alias: string) => {
      if (recipe.icon_2_selector && alias === 'ocp_icon') {
        // Choose the icon selected
        tokenArray.push(recipe.icon_2_selector.replace(/\s/g, '.'));
      } else {
        if (recipe.lens_tab && recipe[alias] && alias === 'ocp_lens_ref') {
          if (recipe.lens_tab === 'lens_1') {
            tokenArray.push(recipe.ocp_lens_ref);
          }
          if (recipe.lens_tab === 'lens_2') {
            tokenArray.push(recipe.ocp_lens_ref_2);
          }
        } else {
          // If second lenses exist, use the second lenses reference instead.
          if (recipe.show_second_lens === 'YES' && alias === 'ocp_lens_ref') {
            tokenArray.push(recipe.ocp_lens_ref_2);
          } else {
            tokenArray.push(recipe[alias] ? recipe[alias].replace(/\s/g, '.') : 'NULL');
          }
        }
      }
    });
    if (productSize) {
      tokenArray.push(productSize);
    }

    const token = ['TKN', productModelCode.toUpperCase()].concat(tokenArray).join('~');

    return encodeURIComponent(token);
  }
}
export class RbnCustomAPI extends LuxBaseAPI {
  getToken(): string {
    const skipServices = true;
    const recipe = this.coreService.getRecipe('custom', 'alias', 'vendorId');
    const productVendorId = this.coreService.getProduct().vendorId;
    let tokenArray = RBN_TOKEN_ALIASES.map((alias: string) => {
      if (alias.indexOf('service') > -1) {
        return '';
      } else {
        return recipe[alias] ? recipe[alias].replace(/\s/g, '.') : 'NULL';
      }
    });
    tokenArray = tokenArray.filter((el) => {
      if (el) {
        return el;
      }
      return undefined;
    });
    if (!skipServices) {
      const selectedLensesSku = this.coreService
        .getAttributeByAlias('lenses_sku')
        .values.filter((value: any) => value.selected)[0];
      if (selectedLensesSku && selectedLensesSku.metadata) {
        const services: any[] = [];
        selectedLensesSku.metadata.map((data: any) => {
          if (data.key.indexOf('Service') > -1) {
            const order = data.key.match(/[0-9]/);
            services[order[0]] = data.value;
          }
          return undefined;
        });
        services.map((service) => tokenArray.push(service));
      }
    }
    const token = ['TKN', productVendorId.toUpperCase()].concat(tokenArray).join('~');
    return encodeURIComponent(token);
  }
}

import { use, useEffect, useState } from 'react';

export interface IProduct {
  name: string;
  id: number;
  vendorId: string;
  defaultViewName: string;
  environment: string;
  customerId: number;
  workflow: string;
}
export interface IConfigureAPI {
  product: { id: number };
  getProduct(): IProduct;
  getRecipe(format: string, option1?: string, option2?: string): string;
  destroy(): void;
}

function getProductImg(apiKey: string, coreService: IConfigureAPI): string {
    const isMobile = false;
    const conciseRecipe = coreService.getRecipe('legacyConcise');
    const uriRecipe = encodeURI(conciseRecipe);
    const { id, defaultViewName, environment, workflow, customerId } = coreService.getProduct();
    const format = 'png';
    const quality = '50';
    const sacale = isMobile ? '0.2' : '0.5';
    const baseURL = `https://prod.fluidconfigure.com/imagecomposer/generate/?view=${defaultViewName}&apiKey=${apiKey}&workflow=${workflow}&environment=${environment}&customerId=${customerId}&productId=${id}&purpose=serverDisplay&format=${format}&trim=false&padding=0&scale=${sacale}&binary=true&quality=${quality}&backgroundColor=%23f6f6f6ff&recipe=${uriRecipe}`;
    return baseURL;
  }

const myPromise = new Promise((resolve, reject) => {
  const pref = 'https://cdn-prod.fluidconfigure.com/static/configs/3.13.0/prod/prod/1581/preferences.json';
  const graph = 'https://cdn-prod.fluidconfigure.com/static/configs/3.13.0/prod/prod/1581/product/22972/graph-settings-en_US.json';
  
  Promise.all([
    fetch(pref), 
    fetch(graph)
  ])
  .then(async ([prefResponse, graphResponse]) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const createCore = await require('@cfg.plat/configure-core');
    if (!prefResponse.ok || !graphResponse.ok) {
      return reject(new Error('Error loading graph or settings JSONs'));
    }
    const productGraph = await graphResponse.json();
    const preferences = await prefResponse.json();

    createCore(
      {
        productGraph,
        preferences,
        shouldSkipCache: false,
        product: 22972,
        customer: 1581,
        workflow: 'prod'
      },
      (error: Error, configureCore: IConfigureAPI) => {
        if (error) {
          return reject(error);
        }
        const im = getProductImg('LUX-Ray-Ban-8taOhSR5AFyjt9tfxU', configureCore);
        return resolve(im);
      }
    );
  }).catch((e) => reject(e));

});

export default function Model() {
  const [isImageLoaded, setIsImageLoaded] = useState('https://cdn-prod.fluidconfigure.com/static/fluid-implementation-lux.s3.amazonaws.com/lux-ocp/rbn/assets/img/sk.webp');
  const img = use(myPromise) as string;

  useEffect(
    () => {
      fetch(img)
        .then(() => setIsImageLoaded(img))
        .catch((e) => console.log(e));
    }
  , [img]);

  return (isImageLoaded && 
    <section className="yr-model">
      <picture className={('yr-skeleton yr-model__placeholder yr-image')}>
        <img src={isImageLoaded} alt="Model" />
      </picture>
    </section>
  );
}
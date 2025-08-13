import { use } from 'react';
import { IConfigureAPI } from '../../declarations/interfaces';

declare global {
  interface Window {
    rtrViewerMV: unknown;
    _configure: unknown;
    vmmv: unknown;
    _rxcData: unknown;
    RXC: unknown;
    RXC_LOADED: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YR: any;
    _fluid: unknown;
  }
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
  const params = { customer: 1581, product: 22972, workflow: 'prod' };

  window.YR?.createConfigure(params, (err: Error, configure: IConfigureAPI) => {
    if (err) {
      return reject(err);
    }
    const im = getProductImg('LUX-Ray-Ban-8taOhSR5AFyjt9tfxU', configure);
    return resolve(im);
  });
});

//const URL = 'https://prod.fluidconfigure.com/imagecomposer/generate/?view=FFL&apiKey=LUX-Ray-Ban-8taOhSR5AFyjt9tfxU&workflow=prod&environment=prod&customerId=1581&productId=22972&purpose=serverDisplay&format=png&trim=false&padding=0&scale=0.5&binary=true&quality=50&backgroundColor=%23f6f6f6ff&recipe=0,0,11,92,0,1,0,3,20,8,2,0,82,8,0,8,0,0,%7B%22text%22:%22%22%7D,%7B%22text%22:%22%22%7D,%7B%22text%22:%22%22%7D,%7B%22text%22:%22%22%7D,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,0,2,2,0,%7B%22text%22:%22%22%7D,%7B%22text%22:%22%22%7D,0,1,0,0,-1,-1,-1,-1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0';
export default function Model() {
  const i = use(myPromise) as string;
  console.log({i});
  return ( 
    <section className="yr-model">
      <picture className={('yr-skeleton yr-model__placeholder yr-image')}>
        <img src={i} alt="Model" />
      </picture>
    </section>
  );
}
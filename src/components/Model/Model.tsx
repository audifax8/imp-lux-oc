import { use } from 'react';
import { IConfigureAPI } from '../../declarations/interfaces';
import { setAPIReady } from '../../libs/yr-react/store/ConfigureStore';
import { setShowSkeleton, setTokenAndImage, useUIState } from '../../store/UIStore';

import { apis } from '../../libs/apis';
import { CDN_FLUID_BASE_URL } from '../../declarations/constants';

const myPromise = new Promise((resolve, reject) => {
  const { workflow, customer, product, locale } = apis.getParams();
  const graph = `${CDN_FLUID_BASE_URL}/static/configs/3.13.0/prod/${workflow}/${customer}/product/${product}/graph-settings-${locale}.json`
  const pref = `${CDN_FLUID_BASE_URL}/static/configs/3.13.0/prod/${workflow}/${customer}/preferences.json`;
  
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
        product,
        customer,
        workflow
      },
      (error: Error, configureCore: IConfigureAPI) => {
        if (error) {
          return reject(error);
        }
        apis.initLuxApi(configureCore);
        const configureImg = apis.luxAPI.getProductImg('LUX-Ray-Ban-8taOhSR5AFyjt9tfxU');
        const token = apis.luxAPI.getToken();
        setAPIReady(true);
        setTokenAndImage(token, configureImg);
        setShowSkeleton(false);
        return resolve(configureImg);
      }
    );
  }).catch((e) => reject(e));

});

export default function Model() {
  use(myPromise) as string;
  const [configureImg] = useUIState('configureImg');

  return (configureImg && 
    <section className="yr-model">
      <picture className={('yr-model__placeholder yr-image')}>
        <img src={configureImg} alt="Model" />
      </picture>
    </section>
  );
}
import { use } from 'react';

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
      (error: unknown, configureCore: unknown) => {
        if (error) {
          return reject(error);
        }
        return resolve(configureCore);
      }
    );
  }).catch((e) => reject(e));

});

export default function Home() {
  use(myPromise);
  return (
    <ul>
      <span>Epa!</span>
    </ul>
  );
}
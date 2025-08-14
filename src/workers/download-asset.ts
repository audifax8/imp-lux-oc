self.onmessage = (event: MessageEvent) => {
  const data = event.data;
  const { params, assetsToDownload, assetDescription, isComponents } = data;
  const { yrEnv } = params;

  const headers = new Headers();
  headers.append('Ocp-Apim-Subscription-Key', 'c17dfca82cc14819a4e2b600667c0123');
  headers.append('Accept', 'application/json');
  headers.append('OC-Id', '1ff9e4f3-293e-425d-b17e-4a5cc5578d0b');
  headers.append('OC-Country', 'US');
  headers.append('Cache-Control', 'no-cache');

  try {
    assetsToDownload.forEach((assetUrl: string) => {
      if (yrEnv) {
        console.log(`[WEB WORKER] asset description: ${assetDescription ?? assetDescription}`);
        console.log('[WEB WORKER] assets downloading asset: ', assetUrl);
      }
      fetch(assetUrl, {
        method: 'GET',
        headers: isComponents ? headers : {},
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            return self.postMessage(data);
          }
          return self.postMessage(false);
        })
        .catch(() => {
          return self.postMessage(false);
        });
    });
  } catch (e) {
    if (yrEnv) {
      console.log('[WEB WORKER] assets error: ', e);
      console.log(e);
    }
    return self.postMessage(false);
  }
};

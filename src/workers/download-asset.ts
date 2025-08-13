self.onmessage = (event: MessageEvent) => {
  const data = event.data;
  const { params, assetsToDownload, assetDescription } = data;
  const { yrEnv } = params;
  try {
    assetsToDownload.forEach((assetUrl: string) => {
      if (yrEnv) {
        console.log(`[WEB WORKER] asset description: ${assetDescription ?? assetDescription}`);
        console.log('[WEB WORKER] assets downloading asset: ', assetUrl);
      }
      fetch(assetUrl)
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

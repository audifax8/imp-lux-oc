self.onmessage = async (event: MessageEvent) => {
  const data = event.data;
  const { params, assetsURL } = data;
  const { yrEnv } = params;

  if (yrEnv) {
    console.log('Message received in worker:', data);
  }
  try {
    const response = await fetch(assetsURL as string);
    const assets = await response.json();
    if (yrEnv) {
      console.log('RTR assets: ' + assets);
    }
    self.postMessage(assets);
  } catch (e) {
    if (yrEnv) {
      console.log(e);
    }
    self.postMessage({});
  }
};

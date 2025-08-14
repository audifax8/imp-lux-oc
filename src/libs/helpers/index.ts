export function downloadScript(url: string) {
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

export const waitForScriptToLoad = (
  checkTimeMs: number,
  timeOutMs: number,
  elementToCheck: string
) => {
  let elapsedTime = 0;
  let isInitialized: boolean | unknown = false;

  return new Promise((resolve, reject) => {
    const time = setInterval(() => {
      elapsedTime += checkTimeMs;
      isInitialized = Object.hasOwn(window, elementToCheck);
      if (isInitialized) {
        resolve({
          time: (elapsedTime / 1000).toFixed(2) + 's'
        });
        clearInterval(time);
      } else if (elapsedTime > timeOutMs && !isInitialized) {
        reject({
          time: elapsedTime
        });
        clearInterval(time);
      }
    }, checkTimeMs);
  });
};
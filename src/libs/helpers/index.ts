import { IScriptResult } from "@/declarations/interfaces";

export function downloadScript(url: string) {
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

export function waitForScriptToLoad(
  checkTimeMs: number,
  timeOutMs: number,
  elementToCheck: string
): Promise<IScriptResult> {
  let elapsedTime = 0;
  let isInitialized: boolean | unknown = false;

  return new Promise((resolve) => {
    const time = setInterval(() => {
      elapsedTime += checkTimeMs;
      isInitialized = Object.hasOwn(window, elementToCheck);
      if (isInitialized) {
        resolve({
          time: (elapsedTime / 1000).toFixed(2) + 's',
          status: true
        });
        clearInterval(time);
      } else if (elapsedTime > timeOutMs && !isInitialized) {
        resolve({
          time: elapsedTime.toString(),
          status: false
        });
        clearInterval(time);
      }
    }, checkTimeMs);
  });
};
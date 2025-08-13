import { useEffect } from 'react';
import { useParams } from '../state/ui';
import { useApiready } from '../libs/yr-react/hooks/configure';
import { useRTRAPIReady, useRTRError } from '../state/rtr';
import { RTR_URL } from '../declarations/constants';
import { startRTR } from '../store/APIsStore';

//TODO
function downloadScript(url: string) {
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

const waitForScriptToLoad = (checkTimeMs: number, timeOutMs: number) => {
  let elapsedTime = 0;
  let isInitialized: boolean | unknown = false;

  return new Promise((resolve, reject) => {
    const time = setInterval(() => {
      elapsedTime += checkTimeMs;
      isInitialized = window.rtrViewerMV;
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

export const useDownloadRTRScript = () => {
  const [params] = useParams();
  const [rtrAPIReady, setRTRAPIReady] = useRTRAPIReady();
  const [, setRTRError] = useRTRError();
  const apiReady = useApiready();
  const { yrEnv } = params;
  useEffect(() => {
    if (params.rtrDisabled) {
      return;
    }
    if (rtrAPIReady && apiReady) {
      if (yrEnv) {
        console.log('Starting RTR API');
      }
    }

    if (!rtrAPIReady) {
      if (yrEnv) {
        console.log(`Downloading RTR script ${RTR_URL}`);
      }
      downloadScript(RTR_URL);
      //TODO
      /*fetch(RTR_URL)
        .then(async (response) => {
          if (!response.ok) {
            console.log('error');
          }
          await response.json();
          console.log(response);
        })
        .catch((err) => console.log(err));*/
      waitForScriptToLoad(100, 20000)
        .then(() => {
          let result = `RTR error downloading script`;
          if (window.rtrViewerMV) {
            result = 'RTR script loaded';
            startRTR();
            setRTRAPIReady(true);
          }
          if (yrEnv) {
            console.info(result);
          }
        })
        .catch((err) => {
          setRTRError(`RTR error`);
          if (yrEnv) {
            console.log(err, null);
            console.log(err);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtrAPIReady]);
};

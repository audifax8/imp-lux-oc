import { IConfigureInitParams, IRTRBaseAPI } from '@/declarations/interfaces';
import { waitForScriptToLoad } from '@/libs/helpers';
import { startRTR } from '@/store/APIsStore';

type ScriptType = {
  time: string;
  status: boolean
};

export function rtrLoadedPromise(params: IConfigureInitParams): Promise<boolean | null> {
  const { yrEnv, rtrDisabled } = params;
  return new Promise((resolve) => {
    if (rtrDisabled) {
      if (yrEnv) {
        console.log('RTR disabled by URL param');
      }
      return resolve(false);
    }
    waitForScriptToLoad(100, 20000, 'rtrViewerMV')
      .then((e: ScriptType) => {
        if (!e.status) {
          if (yrEnv) {
            console.log('RTR error');
          }
          return resolve(false);
        }
        startRTR();
        return resolve(true);
      })
      .catch((err) => {
        if (yrEnv) {
          console.log('RTR error');
          console.error(err);
        }
        return resolve(false);
      });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rtrResource(promise: any) {
  let status = 'pending';
  let result: IRTRBaseAPI | null = null;

  const suspender = promise.then(
    (r: IRTRBaseAPI) => {
      status = 'success';
      result = r;
      return { result, status };
    },
    (e: null) => {
      status = 'error';
      result = e;
      return { result: null, status };
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      }
      return result;
    },
  };
};

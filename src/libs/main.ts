import { IConfigureInitParams } from '@/declarations/interfaces';
import { createCorePromise } from './core';
import { rtrLoadedPromise } from './rtr';


export async function mainResourcesPromise(
  params: IConfigureInitParams
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  try {
    const configureCore = await createCorePromise(params);
    const rtr = await rtrLoadedPromise(params);
    if (rtr === null || configureCore === null) {
      return null;
    }
    return true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (params.yrEnv) {
      console.log(e);
    }
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mainResources(promise: any) {
  let status = 'pending';
  let result: null;

  const suspender = promise.then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (r: any) => {
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
import { use } from 'react';

import { Button } from '@/components2/button';
import { VM_URL } from '@/declarations/constants';
import { downloadScript, waitForScriptToLoad } from '@/libs/helpers';
import { ButtonProps } from '@/declarations/enums';
import { IScriptResult } from '@/declarations/interfaces';

//TODO
const getVMScriptPromise = new Promise((resolve, reject) => {
  downloadScript(VM_URL);
  return waitForScriptToLoad(100, 20000, 'vmmv')
    .then((e: IScriptResult) => resolve(e))
    //.then((e: IScriptResult) => console.log(e))
    .catch(() => reject({ status: false, time: 2000 }));
});

export default function LazyButton(
  { icon, children, variant = 'rounded', className, onResourceResult, onClick }: ButtonProps
) {
  const result = use(getVMScriptPromise) as IScriptResult;
  if (onResourceResult) {
    onResourceResult(result);
  }

  return (
    <Button icon={icon} children={children} variant={variant} className={className} onClick={onClick}></Button>
  );
}
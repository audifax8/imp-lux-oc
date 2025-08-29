import { use } from 'react';

import { Button } from '@/components/Button';
import { RXC_URL } from '@/declarations/constants';
import { downloadScript, waitForScriptToLoad } from '@/libs/helpers';
import { ButtonProps } from '@/declarations/enums';
import { IScriptResult } from '@/declarations/interfaces';

//TODO
const getRXCcriptPromise = new Promise((resolve, reject) => {
  downloadScript(RXC_URL);
  return waitForScriptToLoad(100, 20000, 'RXC_LOADED')
    .then((e: IScriptResult) => resolve(e))
    .catch(() => reject({ status: false, time: 2000 }));
});

export default function LazyButton(
  { icon, children, variant = 'rounded', className, onResourceResult, onClick }: ButtonProps
) {
  const result = use(getRXCcriptPromise) as IScriptResult;
  if (onResourceResult) {
    onResourceResult(result);
  }

  return (
    <Button icon={icon} children={children} variant={variant} className={className} onClick={onClick}></Button>
  );
}
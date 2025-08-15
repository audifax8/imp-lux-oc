import { use } from 'react';

import { Button } from '@/components/Button';
import { VM_URL } from '@/declarations/constants';
import { downloadScript, waitForScriptToLoad } from '@/libs/helpers';
import { ButtonProps } from '@/declarations/enums';

//TODO
const getVMScriptPromise = new Promise((resolve, reject) => {
  downloadScript(VM_URL);
  return waitForScriptToLoad(100, 20000, 'vmmv')
    .then(() => resolve(true))
    .catch(() => reject(false));
});

export default function LazyButton(
  { icon, children, variant = 'rounded', className, onResourceResult, onClick }: ButtonProps
) {
  const result = use(getVMScriptPromise) as boolean;
  if (onResourceResult) {
    onResourceResult(result);
  }

  return (
    <Button icon={icon} children={children} variant={variant} className={className} onClick={onClick}></Button>
  );
}
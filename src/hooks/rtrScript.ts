import { useParams } from '@/state/ui';

import { RTR_URL } from '@/declarations/constants';

import { downloadScript } from '@/libs/helpers';

export const useDownloadRTRScript = () => {
  const [params] = useParams();
  const { yrEnv, rtrDisabled } = params;
  if (yrEnv && !rtrDisabled) {
    console.log(`Downloading RTR script ${RTR_URL}`);
  }
  if (!rtrDisabled) {
    downloadScript(RTR_URL);
  }
};

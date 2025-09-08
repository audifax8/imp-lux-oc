import { useParams } from '@/state/ui';

import { RTR_URL } from '@/declarations/constants';

import { downloadScript } from '@/libs/helpers';

export const useDownloadRTRScript = () => {
  const [params] = useParams();
  if (params?.yrEnv && !params?.rtrDisabled) {
    console.log(`Downloading RTR script ${RTR_URL}`);
  }
  if (!params?.rtrDisabled) {
    downloadScript(RTR_URL);
  }
};

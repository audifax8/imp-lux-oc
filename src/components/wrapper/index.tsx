import { clsx } from 'clsx';

//import { usePreconnectStaticAssets } from '@/hooks/usePreconnectStaticAssets';
//import { usePreloadStaticAssets } from '@/hooks/usePreloadStaticAssets';
//import { useDownloadRTRScript } from '@/hooks/rtrScript';

import { AppLayout } from '@/components/layout';

import '../../styles/index.scss';

/**
 * Implementation content.
 *
 * All the implementation UI will be added as descendants of this Component.
 */
export function Wrapper() {
  //usePreconnectStaticAssets();
  //usePreloadStaticAssets();
  //useDownloadRTRScript();
  return (
    <main className={clsx('yr-implementation-root')}>
      <AppLayout />
    </main>
  );
}

import { clsx } from 'clsx';

import { usePreconnectStaticAssets } from '../hooks/preconnect';
import { usePreloadStaticAssets } from '../hooks/preload';

import { AppLayout } from './AppLayout';

import '../styles/index.scss';

/**
 * Implementation content.
 *
 * All the implementation UI will be added as descendants of this Component.
 */
export function Wrapper() {
  usePreconnectStaticAssets();
  usePreloadStaticAssets();
  //useDownloadRTRScript();
  return (
    <main className={clsx('yr-implementation-root')}>
      <section>
        <AppLayout />
      </section>
    </main>
  );
}

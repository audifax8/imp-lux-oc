import { clsx } from 'clsx';

import { AppLayout } from '@/components/layout';

import '../../styles/index.scss';

/**
 * Implementation content.
 *
 * All the implementation UI will be added as descendants of this Component.
 */
export function Wrapper() {
  return (
    <main className={clsx('yr-implementation-root')}>
      <AppLayout />
    </main>
  );
}

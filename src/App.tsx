import { lazy, Suspense } from 'react';
import { ModelSkeleton } from './components/Skeleton';

import { usePreconnectStaticAssets } from './hooks/preconnect';
import { usePreloadStaticAssets } from './hooks/preload';

import './styles/index.scss'

const Model = lazy(() => import('./components/Model'));
function App() {
  usePreconnectStaticAssets();
  usePreloadStaticAssets();
  return (
    <>
      <main
        className={'yr-app-layout'}>
          <div className="yr-main-content">
            <Suspense fallback={<ModelSkeleton />}>
              <Model />
            </Suspense>
          </div>
      </main>
    </>
  )
}

export default App

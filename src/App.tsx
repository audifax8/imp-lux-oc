import { lazy, Suspense } from 'react';
import { ModelSkeleton } from './components/Skeleton';

import './App.scss'

const Model = lazy(() => import('./components/Model'));
function App() {
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

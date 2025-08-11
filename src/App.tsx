import { useState } from 'react'
import { lazy, Suspense } from 'react';
import './App.scss'

const Home = lazy(() => import('./components/Home'));
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Suspense fallback={<div>Cargando...</div>}>
        <Home />
      </Suspense>
    </>
  )
}

export default App

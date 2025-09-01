import { loadDefaultUIStore } from '@/store/UIStore';

import { startConfigureStore } from '@/libs/yr-react/store/ConfigureStore';

import { Wrapper } from '@/components/wrapper';

import './styles/index.scss';

function App() {
  startConfigureStore();
  loadDefaultUIStore();

  return (
    <Wrapper />    
  )
}

export default App

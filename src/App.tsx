import { startUIStore } from '@/store/UIStore';

import { startConfigureStore } from '@/libs/yr-react/store/ConfigureStore';

import './styles/index.scss';

import { Wrapper } from '@/components/wrapper';

function App() {
  startConfigureStore();
  startUIStore();

  return (
    <Wrapper />    
  )
}

export default App

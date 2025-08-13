import { startConfigureStore } from './libs/yr-react/store/ConfigureStore';
import { Wrapper } from './components/wrapper';
import { startUIStore } from './store/UIStore';

function App() {
  startConfigureStore();
  startUIStore();

  return (
    <Wrapper />
  )
}

export default App

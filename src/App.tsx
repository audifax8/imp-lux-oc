import { startConfigureStore } from './libs/yr-react/store/ConfigureStore';
import { Wrapper } from './components/wrapper';

function App() {
  startConfigureStore();
  console.log('1');

  return (
    <Wrapper />
  )
}

export default App

import Footer from './components/Footer';
import Header from './components/Header';
import Todos from './components/Todos';
import { TodoProvider } from './context/Context';

function App() {
  return (
    <TodoProvider>
      <Header />
      <Todos />
      <Footer />
    </TodoProvider>
  );
}

export default App;

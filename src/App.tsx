import Footer from './components/Footer';
import Header from './components/Header';
import Todos from './components/Todos';
import { TodoProvider } from './context/Context';

function App() {
  return (
    <TodoProvider>
      <div className="container flex flex-col h-screen sm:min-w-full">
        <Header />
        <Todos />
        <Footer />
      </div>
    </TodoProvider>
  );
}

export default App;

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import { Header } from './components/molecules/Header';
import { Companies } from './pages/Companies';
import { Home } from './pages/Home';
import { Suppliers } from './pages/Suppliers';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index={true} element={<Home />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/suppliers" element={<Suppliers />} />
    </Route>,
  ),
);

function App() {
  return (
    <div className="h-screen">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './nav/Navbar';
import AddProductForm from './Admin/AddProductPage';
import ProductListPage from './Customer/ProductList';
import AdminPage from './Admin/AdminPage';
import HomePage from './HomePage';
import NavbarRes from './nav/NavbarRes.jsx';
import ProductsPage from './Admin/ProductsPage.jsx';
import EditproductPage from './Admin/EditProductPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  return (
    <div className='App'>
      {/* <h1>Welcome to Resto Liff App</h1> */}
      <Router>
        {/* <Navbar /> */}
        <NavbarRes />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/addproduct' element={<AddProductForm />} />
          <Route path='/productsAdmin' element={<ProductsPage />} />
          <Route path='/products' element={<ProductListPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/edit/:id' element={<EditproductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

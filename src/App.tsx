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
import SignupPageAdmin from './pages/SignupPage_admin.jsx';
import ForgotPassPage from './pages/ForgotPassPage.jsx';
import ResetPassPage from './pages/ResetPassPage.jsx';

//context
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <CartProvider>
          <Router>
            <NavbarRes />
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/admin/signup' element={<SignupPageAdmin />} />
              <Route path='/addproduct' element={<AddProductForm />} />
              <Route path='/productsAdmin' element={<ProductsPage />} />
              <Route path='/products' element={<ProductListPage />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/' element={<HomePage />} />
              <Route path='/edit/:id' element={<EditproductPage />} />
              <Route path='/forgotpass' element={<ForgotPassPage />} />
              <Route
                path='/reset-password/:token'
                element={<ResetPassPage />}
              />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

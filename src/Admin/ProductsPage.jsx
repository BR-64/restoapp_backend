import React, { useEffect, useState } from 'react';
import getProducts from '../api/GetProducts';
import ProductCardAdmin from '../components/ProductCardAdmin';
import addProduct from '../api/AddProduct';
import { Link, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    /// fetch data from database
    const loadData = async () => {
      try {
        const result = await getProducts();
        setProductData(result);
        console.log(productData);
      } catch (err) {
        console.error('Failed to loaad Data', err);
      }
    };

    loadData();
  }, []);

  return (
    <div className='content bg-gray-100 text-black'>
      <h2>this is admin product page</h2>
      <br />
      <Link to='/addproduct' className='hover:text-gray-300'>
        <button className='text-black mb-4'>Add new Product</button>
      </Link>
      <br />
      <div class=' m-auto sm:w-200 flex items-center justify-center flex-wrap'>
        {productData.map((product) => (
          <ProductCardAdmin
            // onClick={() => setSelectedItem(product)}
            id={product._id}
            name={product.name}
            img={product.file[0]}
            details={product.description}
            category={product.category}
            price={product.price.toLocaleString()}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

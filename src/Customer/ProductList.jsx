import React, { useEffect, useState } from 'react';
import getProducts from '../api/GetProducts';
import Modal from 'react-modal';
import ProductCard from '../components/ProductCard';
import ItemModal from '../components/ItemModal';
import Test_com from '../components/test_com';
import { useCart } from '../context/CartContext';

const ProductListPage = () => {
  const [productData, setProductData] = useState([]);
  const { addToCart } = useCart();

  // const [activeModal, setActiveModal] = useState(null);
  // const openModal = (id) => setActiveModal(id);
  // const closeModal = () => setActiveModal(null);

  const [selectedItem, setSelectedItem] = useState(null);

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
    <div className='content'>
      {/* <div className=' w-full m-auto h-10 border bg-gray-500'>
        <p>this is search bar</p>
      </div> */}
      <div className=' sticky w-full m-auto h-10 border bg--300 p-2'>
        <p>this is filter bar</p>
      </div>
      {/* <div class='flex items-start justify-evenly flex-wrap'> */}
      <div class='mt-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 m-1'>
        {productData.map((product) => (
          <ProductCard
            onClick={() => setSelectedItem(product)}
            name={product.name}
            img={product.file[0]}
            details={product.description}
            price={product.price.toLocaleString()}
            key={product._id}
            onAddToCart={addToCart}
            pid={product}
          />
        ))}
      </div>

      {/* <Test_com /> */}
      {/* Modal */}
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );

  return (
    <>
      <h1>This is menu / product list page</h1>
      {productData.map((product) => (
        <div className='flex border-r border-b mb-2'>
          <img
            className='w-[200px] h-[200px]'
            src={'http://localhost:5000/' + product.file[0]}
            alt=''
          />
          {/* <img
            src={
              'http://localhost:5000/uploads/gallery/file-1747977757359pete547323268.jpg'
            }
            alt=''
          /> */}
          <div className='ml-3 details text-left'>
            <p
              className='text-xl text-blue-600'
              onClick={() => openModal(product._id)}>
              {product.name}
            </p>
            <p>category : {product.category}</p>
            <p>description : {product.description}</p>
            <p>{product.price} thb</p>
          </div>
          <br />
          <br />

          <Modal
            isOpen={activeModal === product._id}
            onRequestClose={closeModal}
            contentLabel={`Modal for ${product.topic}`}
            style={customStyles}>
            <p>{product._id}</p>
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <hr />
            <button onClick={closeModal}>Close</button>
          </Modal>
        </div>
      ))}
    </>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    borderRadius: '10px',
  },
};

export default ProductListPage;

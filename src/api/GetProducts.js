import axios from 'axios';

const getProducts = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/products/list',
      {
        header: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getProducts;

import axios from 'axios';

const addProduct = async (formData) => {
  console.log('adding product');
  console.log(formData);

  const newForm = new FormData();
  newForm.append('name', formData.name);
  newForm.append('price', formData.price);
  newForm.append('category', formData.category);
  newForm.append('description', formData.description);

  for (let i = 0; i < formData.file.length; i++) {
    newForm.append('file', formData.file[i]);
  }

  console.log(newForm);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/products/add',
      newForm,
      {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(response.message);
    console.log(response);
    return response.data; // return data for further use if needed
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error; // let the caller handle the error
  }
};

export default addProduct;

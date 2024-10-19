import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../Common/SummaryApi';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import Font Awesome icons

const AddMpcjProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    description: '',
  });

  const [products, setProducts] = useState([]); // State to hold the list of products
  const [editingProductId, setEditingProductId] = useState(null); // State for the product being edited


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(SummaryApi.getAllMpcjProducts.url); // Adjust the URL based on your backend
        setProducts(response.data); // Set the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to backend API
      const response = await axios({
        url: SummaryApi.createMpcjProduct.url,
        method: SummaryApi.createMpcjProduct.method,
        data: productData,
      });

      // Alert success message
      alert(response.data.message);

      // Clear form data
      setProductData({
        title: '',
        price: '',
        description: '',
      });

      // Fetch updated products list
      const productsResponse = await axios.get(SummaryApi.getAllMpcjProducts.url);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setProductData({
      title: product.title,
      price: product.price,
      description: product.description,
    });
  };

  // Handle update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${SummaryApi.editMpcjProduct.url}/${editingProductId}`, productData);

      alert('Product updated successfully');

      // Reset editing state
      setEditingProductId(null);
      setProductData({ title: '', price: '', description: '' });

      // Fetch updated products list
      const productsResponse = await axios.get(SummaryApi.getAllMpcjProducts.url);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${SummaryApi.deleteMpcjProduct.url}/${productId}`); // Adjust the URL based on your backend
        alert('Product deleted successfully');
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  // Render
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full max-w-md">
        <form onSubmit={editingProductId ? handleUpdate : handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productData.title}
            />
          </div>
          <div className="mb-6">
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productData.price}
            />
          </div>
          <div className="mb-6">
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productData.description}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            {editingProductId ? 'Save Changes' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Render product list */}
      <div className="mt-8 w-full shadow-md p-5 mx-8 ">
        <h2 className="text-lg font-bold underline">Product List : </h2>
        <ul className="mt-4 border-gray-300 rounded-lg">
          {products.map((product) => (
            <li key={product._id} className="flex justify-between items-center p-4 border-b">
              <div>
                <h3 className="font-semibold"><span className='font-semibold text-red-500'>Title: </span>{product.title}</h3>
                <p><span className='font-semibold text-red-500'>Price: </span>{product.price}</p>
                <p><span className='font-semibold text-red-500'>Description: </span>{product.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)} // Set the product to be edited
                  className="text-green-600 hover:text-green-800">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddMpcjProduct;

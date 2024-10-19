import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import styless from "./MpcjproductCard.module.css";
import Headings from "../utiliti/heading/Heading";
import SummaryApi from "../../Common/SummaryAPI";
import TPMForm from "./TPMForm";
import atoz from "../../assets/dictionary.png";
import tbmbasic from "../../assets/notes.png";
import tbmplus from "../../assets/copy-writing.png";
import tbmad from "../../assets/creative-writing.png";

const MpcjproductCard = () => {
  const [products, setProducts] = useState([]); // State to hold the products
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  // Array of images to repeat for each product
  const productImages = [atoz, tbmbasic, tbmplus, tbmad];

  // Fetch all products when the component loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios({
        url: SummaryApi.getAllMpcjProducts.url, // Update to correct API
        method: SummaryApi.getAllMpcjProducts.method, // Ensure it's GET
      });
      setProducts(response.data); // Set products data to state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to handle product card click
  const handleCardClick = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProduct(null); // Close modal by setting product to null
  };

  return (
    <div className="flex flex-col items-center p-5 md:p-20">
      <div className="self-start md:ms-16">
        <Headings heading={"h2"} style={"text-shadow"}>
          <span className="text-primary">MPCJ</span> and <span className="text-primary">CGCJ</span> 2024 (Mains)
        </Headings>
        <Headings heading={"h3"}>Exclusive Practice Material</Headings>
        <Headings heading={"h5"}>Starting From 2nd February 2024</Headings>
      </div>

      {/* Display products in groups of 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center flex-wrap">
        {products.map((product, index) => (
          <div
            className={styless.card_style}
            key={product._id}
            onClick={() => handleCardClick(product)} // Handle card click
          >
            <div className={styless.content}>
              {/* Cycle through the images using modulo */}
              <img
            
                src={productImages[index % productImages.length]} // Cycle images for each product
                className={styless.icons}
                alt={product.title}
              />
              <div className={styless.title}>{product.title}</div>
              <div className={styless.price}> ₹ {product.price}</div>
              <div className={styless.description}>{product.description}</div>
              <div className={styless.buy}>{product.buy}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal with close button */}
      {selectedProduct && (
        <div className={styless.modal_overlay}>
          <div className={styless.modal_content}>
            <button className={styless.close_button} onClick={closeModal}>
              &times;
            </button>
            <TPMForm selectedProduct={selectedProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MpcjproductCard;

const Product = require('../models/addMpcjProduct'); // Model for products

// Create a new product (POST)
const createMpcjProduct = async (req, res) => {
  try {
    // Create a new product from request body data
    const newProduct = new Product({
      img: req.body.img,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      buy: req.body.buy || 'Buy Now', // Default value if buy is not provided
    });

    // Save the new product to MongoDB
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Get all products (GET)
const getAllMpcjProducts = async (req, res) => {
  try {
    // Fetch all products from MongoDB
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Edit a product (PUT)
const editMpcjProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from request parameters
    const updatedData = req.body; // Get updated data from request body

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product (DELETE)
const deleteMpcjProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from request parameters

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createMpcjProduct,
  getAllMpcjProducts,
  editMpcjProduct, // Export the edit function
  deleteMpcjProduct, // Export the delete function
};

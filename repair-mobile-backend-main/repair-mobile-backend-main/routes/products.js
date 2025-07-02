const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');

// GET: Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware: Function to get a product by ID with ObjectId validation
async function getProduct(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

// GET: Get a single product by ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// POST: Create a new product
router.post('/', async (req, res) => {
  // First check if a product with this item code already exists
  try {
    const existingProduct = await Product.findOne({ itemCode: req.body.itemCode });
    if (existingProduct) {
<<<<<<< HEAD
      return res.status(400).json({ message: "Item Code already exists. Please use a unique Item Code." });
=======
      return res.status(400).json({ message: "GRN already exists. Please use a unique Item Code." });
>>>>>>> feature-yashini
    }

    const product = new Product({
      itemCode: req.body.itemCode,
      itemName: req.body.itemName,
      category: req.body.category,
      buyingPrice: req.body.buyingPrice,
      sellingPrice: req.body.sellingPrice,
<<<<<<< HEAD
      minimumPrice: req.body.minimumPrice,
=======
>>>>>>> feature-yashini
      stock: req.body.stock,
      supplierName: req.body.supplierName,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    // Check for MongoDB duplicate key error (code 11000)
    if (err.code === 11000 && err.keyPattern && err.keyPattern.itemCode) {
<<<<<<< HEAD
      return res.status(400).json({ message: "Item Code already exists. Please use a unique Item Code." });
=======
      return res.status(400).json({ message: "GRN already exists. Please use a unique Item Code." });
>>>>>>> feature-yashini
    }
    res.status(400).json({ message: err.message });
  }
});

// PATCH: Update an existing product (partial update)
router.patch('/:id', getProduct, async (req, res) => {
  // If itemCode is being changed, check if the new code already exists
  if (req.body.itemCode != null && req.body.itemCode !== res.product.itemCode) {
    try {
      const existingProduct = await Product.findOne({ itemCode: req.body.itemCode });
      if (existingProduct) {
<<<<<<< HEAD
        return res.status(400).json({ message: "Item Code already exists. Please use a unique Item Code." });
=======
        return res.status(400).json({ message: "GRN already exists. Please use a unique Item Code." });
>>>>>>> feature-yashini
      }
      res.product.itemCode = req.body.itemCode;
    } catch (err) {
      return res.status(500).json({ message: "Error checking item code: " + err.message });
    }
  }

  if (req.body.itemName != null) {
    res.product.itemName = req.body.itemName;
  }
  if (req.body.category != null) {
    res.product.category = req.body.category;
  }
  if (req.body.buyingPrice != null) {
    res.product.buyingPrice = req.body.buyingPrice;
  }
  if (req.body.sellingPrice != null) {
    res.product.sellingPrice = req.body.sellingPrice;
  }
<<<<<<< HEAD
  if (req.body.minimumPrice != null) {
    res.product.minimumPrice = req.body.minimumPrice;
  }
=======
>>>>>>> feature-yashini
  if (req.body.stock != null) {
    res.product.stock = req.body.stock;
  }
  if (req.body.supplierName != null) {
    res.product.supplierName = req.body.supplierName;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    // Check for MongoDB duplicate key error (code 11000)
    if (err.code === 11000 && err.keyPattern && err.keyPattern.itemCode) {
<<<<<<< HEAD
      return res.status(400).json({ message: "Item Code already exists. Please use a unique Item Code." });
=======
      return res.status(400).json({ message: "GRN already exists. Please use a unique Item Code." });
    }
    res.status(400).json({ message: err.message });
  }
});

// PUT: Full update of a product by ID
router.put('/:id', getProduct, async (req, res) => {
  // List of updatable fields
  const updatableFields = [
    'itemCode', 'itemName', 'category', 'buyingPrice', 'sellingPrice', 'stock', 'supplierName',
    'newBuyingPrice', 'newSellingPrice', 'newStock',
    'oldStock', 'oldBuyingPrice', 'oldSellingPrice'
  ];

  // Check for itemCode uniqueness if changed
  if (req.body.itemCode && req.body.itemCode !== res.product.itemCode) {
    try {
      const existingProduct = await Product.findOne({ itemCode: req.body.itemCode });
      if (existingProduct) {
        return res.status(400).json({ message: 'GRN already exists. Please use a unique Item Code.' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error checking item code: ' + err.message });
    }
  }

  // Replace all updatable fields
  updatableFields.forEach(field => {
    if (req.body[field] !== undefined) {
      res.product[field] = req.body[field];
    } else {
      res.product[field] = undefined; // Remove field if not provided
    }
  });

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.itemCode) {
      return res.status(400).json({ message: 'GRN already exists. Please use a unique Item Code.' });
>>>>>>> feature-yashini
    }
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a product by itemCode
router.get('/itemCode/:itemCode', async (req, res) => {
  try {
    const product = await Product.findOne({ itemCode: req.params.itemCode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Update stock and price of an existing product or create new
router.patch('/update-stock/:itemCode', async (req, res) => {
  try {
    const itemCode = decodeURIComponent(req.params.itemCode);
<<<<<<< HEAD
    const { newStock, newBuyingPrice, newSellingPrice, newMinimumPrice, itemName, category, supplierName } = req.body;
=======
    const { newStock, newBuyingPrice, newSellingPrice, itemName, category, supplierName } = req.body;
>>>>>>> feature-yashini

    // Validate required fields
    if (!itemName || typeof itemName !== 'string' || itemName.trim() === '') {
      return res.status(400).json({ message: 'Item name is required and must be a non-empty string' });
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'Category is required and must be a non-empty string' });
    }
<<<<<<< HEAD
    if (newStock === undefined || isNaN(Number(newStock)) || Number(newStock) < 0) {
      return res.status(400).json({ message: 'New stock is required and must be a non-negative number' });
    }
    if (newBuyingPrice === undefined || isNaN(Number(newBuyingPrice)) || Number(newBuyingPrice) < 0) {
      return res.status(400).json({ message: 'New buying price is required and must be a non-negative number' });
    }
    if (newSellingPrice === undefined || isNaN(Number(newSellingPrice)) || Number(newSellingPrice) < 0) {
      return res.status(400).json({ message: 'New selling price is required and must be a non-negative number' });
    }
    if (newMinimumPrice === undefined || isNaN(Number(newMinimumPrice)) || Number(newMinimumPrice) < 0) {
      return res.status(400).json({ message: 'New minimum price is required and must be a non-negative number' });
    }
=======
    if (newStock === undefined || newStock === null || newStock === '' || isNaN(Number(newStock)) || Number(newStock) < 0) {
      return res.status(400).json({ message: 'New stock is required and must be a non-negative number' });
    }
    if (newBuyingPrice === undefined || newBuyingPrice === null || newBuyingPrice === '' || isNaN(Number(newBuyingPrice)) || Number(newBuyingPrice) < 0) {
      return res.status(400).json({ message: 'New buying price is required and must be a non-negative number' });
    }
    if (newSellingPrice === undefined || newSellingPrice === null || newSellingPrice === '' || isNaN(Number(newSellingPrice)) || Number(newSellingPrice) < 0) {
      return res.status(400).json({ message: 'New selling price is required and must be a non-negative number' });
    }
>>>>>>> feature-yashini
    if (!supplierName || typeof supplierName !== 'string' || supplierName.trim() === '') {
      return res.status(400).json({ message: 'Supplier name is required and must be a non-empty string' });
    }

    let product = await Product.findOne({ itemCode });

    if (!product) {
      // Check if itemCode is already used by another product (double-check)
      const duplicateCheck = await Product.findOne({ itemCode });
      if (duplicateCheck) {
<<<<<<< HEAD
        return res.status(400).json({ message: "Item Code already exists. Please use a unique Item Code." });
=======
        return res.status(400).json({ message: "GRN already exists. Please use a unique Item Code." });
>>>>>>> feature-yashini
      }

      // Create new product if it doesn't exist
      product = new Product({
        itemCode,
        itemName,
        category,
        buyingPrice: Number(newBuyingPrice),
        sellingPrice: Number(newSellingPrice),
<<<<<<< HEAD
        minimumPrice: Number(newMinimumPrice),
=======
>>>>>>> feature-yashini
        stock: Number(newStock),
        supplierName,
      });
    } else {
      // Store old values before updating
      product.oldStock = product.stock;
      product.oldBuyingPrice = product.buyingPrice;
      product.oldSellingPrice = product.sellingPrice;
<<<<<<< HEAD
      product.oldMinimumPrice = product.minimumPrice;
=======
>>>>>>> feature-yashini

      // Update the stock and prices
      product.stock += Number(newStock);
      product.buyingPrice = Number(newBuyingPrice);
      product.sellingPrice = Number(newSellingPrice);
<<<<<<< HEAD
      product.minimumPrice = Number(newMinimumPrice);
=======
>>>>>>> feature-yashini
      product.supplierName = supplierName;
    }

    const updatedProduct = await product.save();
    res.json({ message: "Stock updated successfully", updatedProduct });
  } catch (err) {
    // Check for MongoDB duplicate key error (code 11000)
    if (err.code === 11000 && err.keyPattern && err.keyPattern.itemCode) {
<<<<<<< HEAD
      return res.status(400).json({ message: "Item Code already exists. Please use a unique Item Code." });
=======
      return res.status(400).json({ message: "GRN already exists. Please use a unique Item Code." });
>>>>>>> feature-yashini
    }
    res.status(400).json({ message: err.message });
  }
});

// PATCH: Process product return
router.patch('/return/:id', async (req, res) => {
  try {
    const { returnQuantity, returnType } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const quantity = Number(returnQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      console.error('Invalid return quantity:', returnQuantity);
      return res.status(400).json({ message: 'Invalid return quantity' });
    }

    if (returnType === 'out-stock') {
      if (product.stock < quantity) {
        console.error('Return quantity exceeds available stock:', quantity);
        return res.status(400).json({ message: 'Return quantity exceeds available stock' });
      }
      product.stock -= quantity; // Reduce stock
    }

    const updatedProduct = await product.save();
    res.json({ message: 'Product return processed', updatedProduct });
  } catch (err) {
    console.error('Error processing return:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
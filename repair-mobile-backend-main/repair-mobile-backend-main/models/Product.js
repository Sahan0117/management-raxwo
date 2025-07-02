const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  itemCode: {
    type: String,
    required: [true, 'Item code is required'],
    unique: true,
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required']
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  buyingPrice: {
    type: Number,
    required: [true, 'Buying price is required'],
    min: [0, 'Price must be positive']
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: [0, 'Price must be positive']
  },
<<<<<<< HEAD
  minimumPrice: {
    type: Number,
    required: [true, 'Minimum price is required'],
    min: [0, 'Price must be positive']
  },
=======
>>>>>>> feature-yashini
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  supplierName: {
    type: String,
    required: [true, 'Supplier name is required'],
    default: "Default Supplier"
  },
  // New Updated Values
  newBuyingPrice: {
    type: Number,
    min: [0, 'Price must be positive']
  },
  newSellingPrice: {
    type: Number,
    min: [0, 'Price must be positive']
  },
<<<<<<< HEAD
  newMinimumPrice: {
    type: Number,
    min: [0, 'Price must be positive']
  },
=======
>>>>>>> feature-yashini
  newStock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  // Old Values
  oldStock: Number,
  oldBuyingPrice: Number,
  oldSellingPrice: Number,
<<<<<<< HEAD
  oldMinimumPrice: Number,
=======
>>>>>>> feature-yashini
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Supplier = require('../models/Supplier');
<<<<<<< HEAD
=======
const GRN = require('../models/GRN');
>>>>>>> feature-yashini

// GET: Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware: Function to get a supplier by ID with ObjectId validation
async function getSupplier(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid supplier ID format' });
  }

  let supplier;
  try {
    supplier = await Supplier.findById(req.params.id);
    if (supplier == null) {
      return res.status(404).json({ message: 'Cannot find supplier' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.supplier = supplier;
  next();
}

// GET: Get a single supplier by ID
router.get('/:id', getSupplier, (req, res) => {
  res.json(res.supplier);
});

// POST: Create a new supplier
router.post('/', async (req, res) => {
  const supplierData = {
    date: req.body.date,
    time: req.body.time,
    businessName: req.body.businessName || '',
    supplierName: req.body.supplierName,
    phoneNumber: req.body.phoneNumber || '',
    address: req.body.address || '',
    totalPayments: req.body.totalPayments || 0,
    items: req.body.items || [],
  };

  const supplier = new Supplier(supplierData);

  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH: Update an existing supplier
router.patch('/:id', getSupplier, async (req, res) => {
  if (req.body.date != null) {
    res.supplier.date = req.body.date;
  }
  if (req.body.time != null) {
    res.supplier.time = req.body.time;
  }
  if (req.body.businessName != null) {
    res.supplier.businessName = req.body.businessName;
  }
  if (req.body.supplierName != null) {
    res.supplier.supplierName = req.body.supplierName;
  }
  if (req.body.phoneNumber != null) {
    res.supplier.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.address != null) {
    res.supplier.address = req.body.address;
  }
  if (req.body.totalPayments != null) {
    res.supplier.totalPayments = req.body.totalPayments;
  }
  if (req.body.items != null) {
    res.supplier.items = req.body.items;
  }

  try {
    const updatedSupplier = await res.supplier.save();
    res.json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a supplier
router.delete('/:id', getSupplier, async (req, res) => {
  try {
    await res.supplier.deleteOne();
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add an item to a supplier's cart
router.post('/:id/items', getSupplier, async (req, res) => {
  const item = {
    itemCode: req.body.itemCode,
    itemName: req.body.itemName,
    category: req.body.category,
    quantity: req.body.quantity,
    buyingPrice: req.body.buyingPrice,
    sellingPrice: req.body.sellingPrice,
<<<<<<< HEAD
    minimumPrice: req.body.minimumPrice,
    supplierName: req.body.supplierName,
=======
    supplierName: req.body.supplierName,
    grnNumber: req.body.grnNumber || 'GRN-' + Math.random().toString(36).substr(2, 9).toUpperCase()
>>>>>>> feature-yashini
  };

  res.supplier.items.push(item);

  try {
    const updatedSupplier = await res.supplier.save();
    res.status(201).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH: Update an item in a supplier's cart
router.patch('/:id/items/:itemIndex', getSupplier, async (req, res) => {
  const itemIndex = parseInt(req.params.itemIndex);
  if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= res.supplier.items.length) {
    return res.status(400).json({ message: 'Invalid item index' });
  }

  const item = res.supplier.items[itemIndex];
  if (req.body.itemCode != null) item.itemCode = req.body.itemCode;
  if (req.body.itemName != null) item.itemName = req.body.itemName;
  if (req.body.category != null) item.category = req.body.category;
  if (req.body.quantity != null) item.quantity = req.body.quantity;
  if (req.body.buyingPrice != null) item.buyingPrice = req.body.buyingPrice;
  if (req.body.sellingPrice != null) item.sellingPrice = req.body.sellingPrice;
<<<<<<< HEAD
  if (req.body.minimumPrice != null) item.minimumPrice = req.body.minimumPrice;
  if (req.body.supplierName != null) item.supplierName = req.body.supplierName;
=======
  if (req.body.supplierName != null) item.supplierName = req.body.supplierName;
  if (req.body.grnNumber != null) item.grnNumber = req.body.grnNumber;
>>>>>>> feature-yashini

  try {
    const updatedSupplier = await res.supplier.save();
    res.json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove an item from a supplier's cart
router.delete('/:id/items/:itemIndex', getSupplier, async (req, res) => {
  const itemIndex = parseInt(req.params.itemIndex);
  if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= res.supplier.items.length) {
    return res.status(400).json({ message: 'Invalid item index' });
  }

  res.supplier.items.splice(itemIndex, 1);

  try {
    const updatedSupplier = await res.supplier.save();
    res.json(updatedSupplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Record a payment for a supplier
router.post('/:id/payments', getSupplier, async (req, res) => {
  const { paymentAmount } = req.body;

  if (typeof paymentAmount !== 'number' || paymentAmount <= 0) {
    return res.status(400).json({ message: 'Payment amount must be a positive number' });
  }

  // Calculate total cost
  const totalCost = res.supplier.items.reduce(
    (sum, item) => sum + (item.buyingPrice || 0) * (item.quantity || 0),
    0
  );
  const currentPayments = res.supplier.totalPayments || 0;
  const amountDue = totalCost - currentPayments;

  if (paymentAmount > amountDue) {
    return res.status(400).json({ message: 'Payment amount cannot exceed amount due' });
  }

  res.supplier.totalPayments = currentPayments + paymentAmount;

  try {
    const updatedSupplier = await res.supplier.save();
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

<<<<<<< HEAD
=======
// POST: Create a GRN for a supplier
router.post('/:id/grns', getSupplier, async (req, res) => {
  try {
    const { items, totalAmount, grnNumber } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required for GRN' });
    }
    if (typeof totalAmount !== 'number' || totalAmount < 0) {
      return res.status(400).json({ message: 'Total amount must be a non-negative number' });
    }
    if (!grnNumber) {
      return res.status(400).json({ message: 'GRN is required' });
    }

    // Check if GRN is unique
    const existingGRN = await GRN.findOne({ grnNumber });
    if (existingGRN) {
      return res.status(400).json({ message: 'GRN must be unique' });
    }

    const grn = new GRN({
      supplier: res.supplier._id,
      date: new Date(),
      items,
      totalAmount,
      grnNumber
    });
    const newGRN = await grn.save();
    res.status(201).json(newGRN);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: List all GRNs for a supplier
router.get('/:id/grns', getSupplier, async (req, res) => {
  try {
    const grns = await GRN.find({ supplier: res.supplier._id });
    res.json(grns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a single GRN by its ID for a supplier
router.get('/:id/grns/:grnId', getSupplier, async (req, res) => {
  try {
    const grn = await GRN.findOne({ _id: req.params.grnId, supplier: res.supplier._id });
    if (!grn) {
      return res.status(404).json({ message: 'GRN not found for this supplier' });
    }
    res.json(grn);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Delete a GRN by its ID for a supplier
router.delete('/:id/grns/:grnId', getSupplier, async (req, res) => {
  try {
    const grn = await GRN.findOneAndDelete({ _id: req.params.grnId, supplier: res.supplier._id });
    if (!grn) {
      return res.status(404).json({ message: 'GRN not found for this supplier' });
    }
    res.json({ message: 'GRN deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

>>>>>>> feature-yashini
module.exports = router;
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Product = require('../models/Product');
const Counter = require('../models/Counter');
const authMiddleware = require('../middleware/authMiddleware');
<<<<<<< HEAD
=======

>>>>>>> feature-yashini
const getNextInvoiceNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { _id: 'invoiceNumber' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

// POST: Create a new payment (Protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
<<<<<<< HEAD
    const { items, totalAmount, discountApplied, paymentMethod, cashierId, cashierName } = req.body;
=======
    const { items, totalAmount, discountApplied, paymentMethod, cashierId, cashierName, customerName, contactNumber, address, isWholesale, customerDetails } = req.body;
    console.log('Received payment data in backend:', { items, totalAmount, discountApplied, paymentMethod, cashierId, cashierName, customerName, contactNumber, address, isWholesale, customerDetails }); // Debug log
>>>>>>> feature-yashini

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }
    
    if (!totalAmount || !paymentMethod) {
      return res.status(400).json({ message: 'Total amount and payment method are required' });
    }

    if (!cashierId || !cashierName) {
      return res.status(400).json({ message: 'Cashier ID and name are required' });
    }

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${item.itemName}` });
      }
    }

    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }

    const invoiceNumber = `INV-${await getNextInvoiceNumber()}`;

    const payment = new Payment({
      invoiceNumber,
      items,
      totalAmount,
      discountApplied: discountApplied || 0,
      paymentMethod,
      cashierId,
      cashierName,
<<<<<<< HEAD
    });

    const savedPayment = await payment.save();
=======
      customerName: customerName || '',
      contactNumber: contactNumber || '',
      address: address || '',
      isWholesale: isWholesale || false,
      customerDetails: isWholesale ? customerDetails : null,
    });

    const savedPayment = await payment.save();
    console.log('Saved payment document:', savedPayment); // Debug log
>>>>>>> feature-yashini
    res.status(201).json({ 
      message: 'Payment successful', 
      payment: savedPayment, 
      invoiceNumber 
    });
  } catch (err) {
    console.error('Payment save error:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET: Retrieve all payments (Protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find().populate('items.productId');
<<<<<<< HEAD
=======
    console.log('Fetched payments from backend:', payments); // Debug log
>>>>>>> feature-yashini
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Delete a payment by ID (Protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

<<<<<<< HEAD
    // Optionally restore stock if deleting a sale (not a refund)
=======
>>>>>>> feature-yashini
    if (payment.paymentMethod !== 'Refund') {
      for (const item of payment.items) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
      }
    }

    await Payment.findByIdAndDelete(paymentId);
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error('Delete payment error:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST: Process a return payment (Protected route)
router.post('/return', authMiddleware, async (req, res) => {
  try {
<<<<<<< HEAD
    const { items, totalRefund, cashierId, cashierName } = req.body;
=======
    const { items, totalRefund, cashierId, cashierName, customerName, contactNumber, address } = req.body;
>>>>>>> feature-yashini

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided for return' });
    }

    if (!totalRefund || totalRefund <= 0) {
      return res.status(400).json({ message: 'Invalid refund amount' });
    }

    if (!cashierId || !cashierName) {
      return res.status(400).json({ message: 'Cashier ID and name are required' });
    }

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.itemName} not found` });
      }
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
    }

    const returnInvoiceNumber = `RET-${await getNextInvoiceNumber()}`;

    const returnPayment = new Payment({
      invoiceNumber: returnInvoiceNumber,
      items,
      totalAmount: -totalRefund,
      discountApplied: 0,
      paymentMethod: 'Refund',
      cashierId,
      cashierName,
<<<<<<< HEAD
=======
      customerName: customerName || '',
      contactNumber: contactNumber || '',
      address: address || ''
>>>>>>> feature-yashini
    });

    const savedReturn = await returnPayment.save();
    res.status(201).json({
      message: 'Return processed successfully',
      returnPayment: savedReturn,
      returnInvoiceNumber
    });
  } catch (err) {
    console.error('Return save error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
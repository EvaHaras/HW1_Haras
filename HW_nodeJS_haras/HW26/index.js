const express = require('express');
const mongoose = require('mongoose');
const { Category, Product, Order } = require('./models');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://admin:admin123@localhost:27017/admin?authSource=admin')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(' MongoDB error:', err));


app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();  
      res.json(products);  
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving products', error: err });
    }
  });  

app.get('/products/smartphones', async (req, res) => {
  const category = await Category.findOne({ name: 'Smartphones' });
  const products = await Product.find({ category: category._id });
  res.json(products);
});

app.post('/categories', async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.json(category);
  });
  
app.post('/products', async (req, res) => {
    const { name, price, stock, categoryId } = req.body;
  
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid categoryId' });
    }
  
    const product = new Product({
      name,
      price,
      stock,
      category: category._id
    });
  
    await product.save();
    res.json(product);
  });  

app.get('/orders/total-profit', async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalProfit: { $sum: '$total' }
      }
    }
  ]);
  res.json(orders[0]);
});

app.post('/order', async (req, res) => {
  const { items } = req.body; 
  let total = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    product.stock -= item.quantity;
    product.sold += item.quantity;
    total += product.price * item.quantity;
    await product.save();
  }

  const order = await Order.create({
    products: items,
    total
  });

  res.json(order);
});

app.get('/products/top', async (req, res) => {
  const top = await Product.find().sort({ sold: -1 }).limit(3);
  res.json(top);
});

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});

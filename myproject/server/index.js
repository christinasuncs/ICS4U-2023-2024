const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000; // || process.env.PORT


app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

require('./db');

const Product = require('./models/Product.js');

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
})

// Create a new product
app.post('/api/projects', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json
    }
})
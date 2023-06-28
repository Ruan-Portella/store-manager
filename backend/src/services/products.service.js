const model = require('../models/products.model');

const getAllProducts = async () => { 
    const products = await model.getAllProducts();
    return products;
};

const findProductById = async (id) => {
    const product = await model.findProductById(id);
    if (!product) return { message: 'Product not found' };
    return product;
};

module.exports = { getAllProducts, findProductById };
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

const addProduct = async (name) => {
    const insertId = await model.addProduct(name);
    return { id: insertId, name };
};

const editProduct = async (name, id) => {
    const product = await model.findProductById(id);
    if (!product) return { message: 'Product not found' };
    await model.editProduct(name, id);
    return { id, name };
};

const deleteProduct = async (id) => {
    const product = await model.findProductById(id);
    if (!product) return { message: 'Product not found' };
    await model.deleteProduct(id);
    return {};
};

module.exports = { getAllProducts, findProductById, addProduct, editProduct, deleteProduct };
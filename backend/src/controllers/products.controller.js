const service = require('../services/products.service');

const getAllProducts = async (_req, res) => { 
    const products = await service.getAllProducts();
    return res.status(200).json(products);
};

const findProductById = async (req, res) => {
    const { id } = req.params;
    const product = await service.findProductById(id);
    if (product.message) return res.status(404).json(product);
    return res.status(200).json(product);
};

const addProduct = async (req, res) => {
    const { name } = req.body;
    const newProduct = await service.addProduct(name);
    return res.status(201).json(newProduct);
};

module.exports = { getAllProducts, findProductById, addProduct };
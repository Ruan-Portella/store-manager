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

const editProduct = async (req, res) => {
    const product = await service.editProduct(req.body.name, Number(req.params.id));
    if (product.message) return res.status(404).json(product);
    return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await service.deleteProduct(id);
    if (product.message) return res.status(404).json(product);
    return res.status(204).json(product);
};

const findByQueryName = async (req, res) => {
    const { q } = req.query;
    const products = await service.findByQueryName(q);
    return res.status(200).json(products);
};

module.exports = { getAllProducts,
findProductById,
addProduct, 
    editProduct,
deleteProduct,
findByQueryName };
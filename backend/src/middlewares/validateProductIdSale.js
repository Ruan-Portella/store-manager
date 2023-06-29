const productsModel = require('../models/products.model');

const validateProductIdSale = async (req, res, next) => {
    const data = await productsModel.findProductById(req.params.productId);
    if (!data) return res.status(404).json({ message: 'Product not found in sale' });
    next();
};

module.exports = validateProductIdSale;
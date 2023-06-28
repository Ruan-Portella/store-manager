const productsModel = require('../models/products.model');

const validateProductId = async (req, res, next) => {
    const sale = req.body;

    const data = await productsModel.getAllProducts();

    const products = data.map((product) => product.id);
    const saleProduct = sale.map((item) => item.productId);

    const validateId = saleProduct.every((product) => products.includes(product));

    const validate = sale.map((prod) => prod.productId).some((id) => id === undefined);
    
    if (validate) return res.status(400).json({ message: '"productId" is required' });

    if (!validateId) return res.status(404).json({ message: 'Product not found' });

    next();
};

module.exports = validateProductId;
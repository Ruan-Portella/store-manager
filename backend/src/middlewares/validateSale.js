const salesModel = require('../models/sales.model');

const validateSale = async (req, res, next) => {
    const sales = await salesModel.findSalesById(req.params.saleId);
    if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });
    next();
};

module.exports = validateSale;
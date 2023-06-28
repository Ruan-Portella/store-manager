const model = require('../models/sales.model');

const getAllSales = async () => { 
    const Sales = await model.getAllSales();
    return Sales;
};

const findSalesById = async (id) => {
    const Sales = await model.findSalesById(id);
    if (Sales.length === 0) return { message: 'Sale not found' };
    return Sales;
};

module.exports = { getAllSales, findSalesById };
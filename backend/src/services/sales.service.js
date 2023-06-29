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

const addSale = async (itemsSold) => {
    const saleId = await model.addSaleTime();

    itemsSold.map(async (item) => { 
        await model.addSale(saleId, item.productId, item.quantity);
    });

    return { id: saleId, itemsSold };
};

const deleteSale = async (id) => {
    const Sales = await model.findSalesById(id);
    if (Sales.length === 0) return { message: 'Sale not found' };
    await model.deleteSale(id);
    await model.deleteSaleTime(id);
    return Sales;
};

module.exports = { getAllSales, findSalesById, addSale, deleteSale };
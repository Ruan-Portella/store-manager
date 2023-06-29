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

const editSale = async ({ saleId, productId, quantity }) => {
    await model.editSale({ saleId, productId, quantity });
  
    const updatedSale = await model.findSalesById(saleId);

    let saleEdited;

    if (updatedSale instanceof Array) {
      saleEdited = { saleId, ...updatedSale.find((s) => s.productId === productId) };
    } else { 
      saleEdited = { saleId, ...updatedSale };
    }
    return saleEdited;
  };

module.exports = { getAllSales, findSalesById, addSale, deleteSale, editSale };
const sales = require('../services/sales.service');

const getAllSales = async (_req, res) => { 
    const Sales = await sales.getAllSales();
    return res.status(200).json(Sales);
};

const findSalesById = async (req, res) => {
    const { id } = req.params;
    const Sales = await sales.findSalesById(id);
    if (Sales.message) return res.status(404).json(Sales);
    return res.status(200).json(Sales);
};

const addSale = async (req, res) => {
    const itensSold = req.body;
    const newSale = await sales.addSale(itensSold);
    return res.status(201).json(newSale);
};

module.exports = { getAllSales, findSalesById, addSale };
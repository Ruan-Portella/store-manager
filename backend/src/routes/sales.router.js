const express = require('express');
const SalesController = require('../controllers/sales.controller');
const validateProductId = require('../middlewares/validateProductId');
const validateSaleQuantity = require('../middlewares/validateQuantity');
const validateQuantitySale = require('../middlewares/validateQuantitySale');
const validateProductIdSale = require('../middlewares/validateProductIdSale');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.findSalesById);
router.post('/', validateProductId, validateSaleQuantity, SalesController.addSale);
router.delete('/:id', SalesController.deleteSale);
router.put(
'/:saleId/products/:productId/quantity', 
validateQuantitySale,
validateProductIdSale,
validateSale,
SalesController.editSale,
);

module.exports = router;
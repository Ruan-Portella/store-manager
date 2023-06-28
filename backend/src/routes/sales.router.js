const express = require('express');
const SalesController = require('../controllers/sales.controller');
const validateProductId = require('../middlewares/validateProductId');
const validateSaleQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.findSalesById);
router.post('/', validateProductId, validateSaleQuantity, SalesController.addSale);

module.exports = router;
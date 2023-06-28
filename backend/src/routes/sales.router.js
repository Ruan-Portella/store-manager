const express = require('express');
const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.findSalesById);
router.post('/', SalesController.addSale);

module.exports = router;
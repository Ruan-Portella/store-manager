const express = require('express');
const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.findSalesById);

module.exports = router;
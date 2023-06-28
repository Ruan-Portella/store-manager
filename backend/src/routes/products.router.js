const express = require('express');
const productsController = require('../controllers/products.controller');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.findProductById);
router.post('/', validateName, productsController.addProduct);

module.exports = router;
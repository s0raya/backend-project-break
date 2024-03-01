const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController.js');

router.get('/products', apiController.showProductsApi);
router.get('/products/:productId', apiController.showProductByIdApi);
router.get('/dashboard', apiController.showProductsLoginApi);

router.get('/dashboard/:productId', apiController.showProductByIdLoginApi);

router.post('/dashboard', apiController.createProductApi);

router.put('/dashboard/:productId', apiController.updateProductByIdApi);

router.get('/dashboard/:productId/delete', apiController.deleteProductByIdApi);

module.exports = router;

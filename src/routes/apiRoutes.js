const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController.js');

router.get('/api/products', apiController.showProductsApi);
router.get('/api/products/:productId', apiController.showProductByIdApi);
router.get('/api/dashboard', apiController.showProductsLoginApi);

router.get('/api/dashboard/:productId', apiController.showProductByIdLoginApi);

router.post('/api/dashboard', apiController.createProductApi);

router.put('/api/dashboard/:productId', apiController.updateProductByIdApi);

router.get('/api/dashboard/:productId/delete', apiController.deleteProductByIdApi);

module.exports = router;

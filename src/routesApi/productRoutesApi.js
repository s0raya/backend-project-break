const express = require('express');
const router = express.Router();
const productControllerApi = require('../controllersApi/productControllerApi.js');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
    res.redirect('/api/products');
});

router.get('/api/products', productControllerApi.showProducts);

/*router.get('/api/products/:productId', productControllerApi.showProductById);

router.get('/api/dashboard', productControllerApi.showProductsLogin);

router.get('/api/dashboard/:productId', productControllerApi.showProductByIdLogin);

router.get('/api/dashboard/new', productControllerApi.showNewProductForm);

router.post('/api/dashboard', productControllerApi.createProduct);

router.put('/api/dashboard/:productId', productControllerApi.updateProductById);

router.get('/api/dashboard/:productId/edit', productControllerApi.showEditProductForm);

router.get('/api/dashboard/:productId/delete', productControllerApi.deleteProductById);*/

module.exports = router;
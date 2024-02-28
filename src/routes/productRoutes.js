const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
//Redireccion a /products
router.get('/', (req,res) => {
    res.redirect('/products');
});

router.get('/products', productController.showProducts);

router.get('/api/products', productController.showProductsApi);

router.get('/products/:productId', productController.showProductById);

router.get('/api/products/:productId', productController.showProductByIdApi);

router.get('/dashboard', productController.showProductsLogin);

router.get('/api/dashboard', productController.showProductsLoginApi);

router.get('/dashboard/new', productController.showNewProductForm);

//router.get('/api/dashboard/new', productController.showNewProductForm);

router.get('/dashboard/:productId', productController.showProductByIdLogin);

router.get('/api/dashboard/:productId', productController.showProductByIdLoginApi);

router.post('/dashboard', productController.createProduct);

router.post('/api/dashboard', productController.createProductApi);

router.put('/dashboard/:productId', productController.updateProductById);

router.put('/api/dashboard/:productId', productController.updateProductByIdApi);

router.get('/dashboard/:productId/edit', productController.showEditProductForm);

//router.get('/api/dashboard/:productId/edit', productController.showEditProductForm);

router.get('/dashboard/:productId/delete', productController.deleteProductById);

router.get('/api/dashboard/:productId/delete', productController.deleteProductByIdApi);

//router.get('/dashboard/category/:category', productController.showProductsByCategory);

module.exports = router;
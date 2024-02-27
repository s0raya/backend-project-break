const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


//Redireccion a /products
router.get('/', (req,res) => {
    res.redirect('/products');
});

router.get('/products', productController.showProducts);

router.get('/products/:productId', productController.showProductById);

router.get('/dashboard', productController.showProductsLogin);

router.get('/dashboard/new', productController.showNewProductForm);

router.get('/dashboard/:productId', productController.showProductByIdLogin);

router.post('/dashboard', productController.createProduct);

router.put('/dashboard/:productId', productController.updateProductById);

router.get('/dashboard/:productId/edit', productController.showEditProductForm);

router.get('/dashboard/:productId/delete', productController.deleteProductById);


module.exports = router;
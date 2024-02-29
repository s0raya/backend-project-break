const {
    showProducts,
    showProductById,
    showProductsLogin,
    showProductByIdLogin,
    showNewProductForm, 
    createProduct,
    updateProductById, 
    showEditProductForm,
    deleteProductById,
    showProductsByCategory
} = require('../src/controllers/productController');



function resetProducts() {
    products = {}; 
}

beforeEach(() => {
    resetProducts();  
});

describe('showProducts', () => {
    it('should get a product', () => {        
        const product = { name: 'pantalon corto', description: 'pantalon corto estampado', image: 'pantalonEstampado.jpg', category: 'pantalones', size: 'Xl', price: 12.5 };
        
        products[1] = product; 
        
        const result = showProducts();
        
        expect(result).toEqual([product]);
    });

    it('should throw an error if the product does not exist', () => {        
        
        expect(() => showProducts(999)).toThrow('Product does not exist'); 
    });
});
/*describe('showProducts', () => {
    it('should get a product', () => {        
        const product = { name: 'pantalon corto', description: 'pantalon corto estampado', image: 'pantalonEstampado.jpg', category: 'pantalones', size: 'Xl', price: 12.5 };
        const req = { path: '/dashboard' }; 
        const res = { send: jest.fn() }; 
        products[1] = product; 
        const result = showProducts(req, res); 
        expect(result).toEqual([product]);
    });

    it('should throw an error if the product does not exist', () => {
        const req = {}; 
        const res = {};      
        expect(() => showProducts(req, res)).toThrow('Product does not exist'); 
    });
});*/

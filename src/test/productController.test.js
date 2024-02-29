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
} = require('../controllers/productController.js');
const Product = require('../models/Product.js');

jest.mock('../models/Product.js', () => ({
    find: jest.fn(),
    send: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
}));



describe('showProducts', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('show html with products', () => {
        const mockProducts = [
            { name: "camiseta", description: "camiseta con logo", price: 15, image:"", category: "camisetas", size: "M"},
            { name: "pantalones", description: "pantalones rotos", price: 30, image:"", category: "pantalones", size: "L"}
        ];

        Product.find.mockResolvedValue(mockProducts);
    })
    /*it('should get HTML with products', () => {        
        const product = { name: 'pantalon corto', description: 'pantalon corto estampado', image: 'pantalonEstampado.jpg', category: 'pantalones', size: 'Xl', price: 12.5 };
        
        products[1] = product; 
        
        const result = showProducts();
        
        expect(result).toEqual([product]);
    });

   it('should throw an error if the product does not exist', () => {        
        
        expect(() => showProducts(999)).toThrow('Product does not exist'); 
    });
});
describe('showProducts', () => {
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
    });*/
});

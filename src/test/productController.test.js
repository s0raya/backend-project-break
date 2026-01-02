const {
    getNavBar,
    getProducts,
    showProducts,
    showProductById,
    showNewProductForm, 
    createProduct,
    updateProductById, 
    deleteProductById,
} = require('../controllers/productController.js');
const Product = require('../models/Product.js');

jest.mock('../models/Product.js', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()   
}));

describe('getNavBar', () => {
    it('should return the navigation bar in the dashboard path', () => {
        const path = '/dashboard';
        const result = getNavBar(path);
        // Verificar que contiene elementos del navbar del dashboard
        expect(result).toContain('/dashboard/');
        expect(result).toContain('Nuevo Producto');
        expect(result).toContain('/logout');
        expect(result).not.toContain('/login'); // Dashboard no tiene login
    });
    
    it('should return the navigation bar in the products path', () => {
        const path = '/products';
        const result = getNavBar(path);
        // Verificar que contiene elementos del navbar público
        expect(result).toContain('/products/');
        expect(result).toContain('/login');
        expect(result).not.toContain('Nuevo Producto'); // Público no tiene crear producto
    });
});

describe('getProducts', () => {
    it('should return HTML with products', () => {
        const path = '/products/';
        const products = [
            { 
                _id: 1, 
                name: 'Product 1', 
                description: 'Description 1', 
                image: 'test.webp', 
                price: 10, 
                category: 'camisetas', 
                size: 'M' 
            }
        ];
        const result = getProducts(path, products);
        
        expect(result).toContain('Product 1');
        expect(result).toContain('Description 1');
        expect(result).toContain('10€');
        expect(result).toContain('/products/1');
        expect(result).toContain('products-list');
        expect(result).toContain('product-card');
    });
});

describe('showProducts', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return HTML with products', async () => {
        const mockProducts = [
            { 
                _id: 1, 
                name: "camiseta", 
                description: "camiseta con logo", 
                price: 15, 
                image:"", 
                category: "camisetas", 
                size: "M"
            },
            { 
                _id: 2, 
                name: "pantalones", 
                description: "pantalones rotos", 
                price: 30, 
                image:"", 
                category: "pantalones", 
                size: "L"
            }
        ];
        Product.find.mockResolvedValue(mockProducts);

        const req = { 
            path: '/dashboard',
            query: {}
        };
        const res = { 
            send: jest.fn()
        };

        await showProducts(req, res);
        // Verificar que Product.find fué llamado
        expect(Product.find).toHaveBeenCalled();

        expect(res.send).toHaveBeenCalled();
        const sentHTML = res.send.mock.calls[0][0];
        expect(sentHTML).toContain('camiseta');
        expect(sentHTML).toContain('pantalones');
    });

    it('should return error if there is a problem getting products', async () => {
        const mockError = new Error('Error getting products');
        Product.find.mockRejectedValue(mockError);

        const mockReq = { 
            path: '/dashboard',
            query: {}
        };
        const mockRes = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        
        await showProducts(mockReq, mockRes);
        
        expect(Product.find).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ message: 'There was a problem trying get all products'});
    });   
});

describe('showProductById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return HTML with the specified product by ID', async () =>{ 
        const mockProduct = { 
            _id: 1, 
            name: "camiseta", 
            description: "camiseta con logo", 
            price: 15, 
            image:"", 
            category: "camisetas", 
            size: "M"
        };

        Product.findById.mockResolvedValue(mockProduct);

        const req = { 
            path: '/dashboard/1',
            params: {
                productId: 1
            }
        };
        const res = { 
            send: jest.fn()
        };

        await showProductById(req, res);

        // Verificar que Product.find fué llamado
        expect(Product.findById).toHaveBeenCalledWith(1);

        expect(res.send).toHaveBeenCalled();
        const sentHTML = res.send.mock.calls[0][0];
        expect(sentHTML).toContain('camiseta');
        expect(sentHTML).toContain('camiseta con logo');

    });
    it('should throw an error if the product does not exist', async () => {
        Product.findById.mockResolvedValue(null);

        const mockReq = { 
            path: '/products/999',
            params: {
                productId: 999
            }
        };
        const mockRes = { 
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await showProductById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith({message: 'Product not found'});

    });
    it('should throw an error if there are a problem with server', async ()=> {
        const mockError = new Error('Error getting the product by id')
        Product.findById.mockRejectedValue(mockError);

        const mockReq = { 
            path: '/dashboard/1',
            params: {
                productId: 1
            }
        };
        const mockRes = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        
        await showProductById(mockReq, mockRes);
        
        expect(Product.findById).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ message: 'Error getting the product.'});
    });  
});


describe('showNewProductForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should return HTML for the new product form', async () => {
        const req = { path: '/dashboard/new' };
        const res = { send: jest.fn()};

        await showNewProductForm(req, res);

        expect(res.send).toHaveBeenCalled();
        const sentHTML = res.send.mock.calls[0][0];
        expect(sentHTML).toContain('Crear producto');
        expect(sentHTML).toContain('name="name"');
        expect(sentHTML).toContain('name="description"');
        expect(sentHTML).toContain('name="price"');
        expect(sentHTML).toContain('name="category"');
        expect(sentHTML).toContain('name="size"');
        expect(sentHTML).toContain('action="/dashboard/"');
    });
});


describe('createProduct', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new product', async () => {
        const newMockProduct = {
            name: "nuevo producto", 
            description: "descripción del nuevo producto", 
            price: 20, 
            image:"", 
            category: "camisetas", 
            size: "M"
        };
        const createdProduct = { _id: 5, ...newMockProduct }
        Product.create.mockResolvedValue(createdProduct);

        const req = {
            path: '/dashboard',
            body: newMockProduct
        };
        const res = {
            send: jest.fn()
        };
    
        await createProduct(req,res);
        
        expect(Product.create).toHaveBeenCalledWith(newMockProduct);
        expect(res.send).toHaveBeenCalled();
        const sentHTML = res.send.mock.calls[0][0];
        expect(sentHTML).toContain('descripción del nuevo producto');
        expect(sentHTML).toContain('20€');
        expect(sentHTML).toContain('Categoria: camisetas');
        expect(sentHTML).toContain('Talla: M');
    });

    it('should throw an error if any field is empty', async () => {
        const mockReq = {
            body: {
                name: 'Camiseta',
                price: 20,
                category: 'camisetas',
                size: 'M'
            }
        };
        
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await createProduct(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith({ message: 'All fields marked with * are required'})

    })

    it('should throw an error if there are a problem with server', async () => {
        const mockError = new Error('Error creating product')
        Product.create.mockRejectedValue(mockError);

        const mockReq = { 
            path: '/dashboard',
            body: {
                name: "test",
                description: "test",
                price: 10,
                category: "camisetas",
                size: "M"
            }
        };
        const mockRes = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        
        await createProduct(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(500);

        // Verificar que nos devuelve el mensaje de error
        expect(mockRes.send).toHaveBeenCalledWith({ message: 'There was a problem trying to create a product'})
    });  
});


describe('updateProductById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should update an existing product', async () => {
        const updatedMockProduct = {
            id: 5,
            name: "producto actualizado", 
            description: "descripción actualizada", 
            price: 25, 
            image:"", 
            category: "camisetas", 
            size: "L"
        };

        Product.findByIdAndUpdate.mockResolvedValue(updatedMockProduct)

        const mockReq = {
            body: {
                name: "producto actualizado", 
                description: "descripción actualizada", 
                price: 25, 
                image:"", 
                category: "camisetas", 
                size: "L" 
            },
            params: {
                productId: 5
            },
            path: '/dashboard/5'
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

        await updateProductById(mockReq, mockRes);
        expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(5, {...mockReq.body}, { new: true});
        expect(mockRes.send).toHaveBeenCalledWith(expect.stringContaining('<a href="/dashboard/" class="backProducts" id="backProducts">Volver</a>'));
    });

    it('should throw an error if id is empty', async () => {
        const mockReq = {
            body: {},
            params: {},
            path: '/dashboard'
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await updateProductById(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith({message: 'Product not found'})
    });

    it('should throw an error if there are a problem with server', async () => {
        const mockError = new Error('Error updating product')
        Product.findByIdAndUpdate.mockRejectedValue(mockError);

        const mockReq = { 
            path: '/dashboard/5',
            body: {
                name: "test",
                description: "test",
                price: 10,
                category: "camisetas",
                size: "M"
            },
            params: {
                productId: 5
            }
        };
        const mockRes = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        
        await updateProductById(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ message: "There was a problem trying to update the product" })
    });  
});


describe('deleteProductById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete an existing product', async () => {
        const mockProduct = {
            _id: 1,
            name: 'Producto a eliminar',
            description: 'Producto a eliminar',
            price: 20,
            image: '',
            category: 'camisetas',
            size: 'XS'
        }
        Product.findByIdAndDelete.mockResolvedValue(mockProduct);

        const mockReq = {
            params: {
                productId: 1
            },
            path: '/dashboard/1'
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

        await deleteProductById(mockReq, mockRes);        
        expect(Product.findByIdAndDelete).toHaveBeenCalledWith(1);
        expect(mockRes.send).toHaveBeenCalledWith(expect.stringContaining('Product deleted'))
    });

    it('should throw an error during deletion', async () => {
        const mockError = new Error('Error deleting product')
        Product.findByIdAndDelete.mockRejectedValue(mockError);

        const mockReq = {
            params: {
                productId: 1
            },
            path: '/dashboard/1'
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await deleteProductById(mockReq,mockRes);
        expect(Product.findByIdAndDelete).toHaveBeenCalledWith(1);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith(expect.stringContaining('There was a problem trying to delete a product' ));
    })
});
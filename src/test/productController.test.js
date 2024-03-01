const {
    getNavBar,
    showProducts,
    showProductById,
    showProductsLogin,
    showProductByIdLogin,
    showNewProductForm, 
    createProduct,
    updateProductById, 
    showEditProductForm,
    deleteProductById,
    showProductsByCategory,
    getProducts
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

describe('getNavBar', () => {
    it('should return the navigation bar in the dashboard path', () => {
        const path = '/dashboard';
        const expectedHTML = `
            <!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/styles.css">
                    <title>Tienda</title>
                </head>
                <body>
                    <nav class="navbar">
                        <a href="/dashboard/">Productos</a>
                        <a href="/dashboard/?category=camisetas">Camisetas</a>
                        <a href="/dashboard/?category=pantalones">Pantalones</a>
                        <a href="/dashboard/?category=zapatos">Zapatos</a>
                        <a href="/dashboard/?category=accesorios">Accesorios</a>
                        <a href="/dashboard/new">Nuevo Producto</a>
                        <a href="">Logout</a>
                    </nav>
                    <h2 class="title">Productos</h2>
                </body>
            </html>
        `
        expect(getNavBar(path)).toBe(expectedHTML);
    });
    it('should return the navigation bar in the products path', () => {
        const path = '/products';
        const expectedHTML = `
            <!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/styles.css">
                    <title>Tienda</title>
                </head>
                <body>
                    <nav class="navbar">
                        <a href="/products/">Productos</a>
                        <a href="/products/?category=camisetas">Camisetas</a>
                        <a href="/products/?category=pantalones">Pantalones</a>
                        <a href="/products/?category=zapatos">Zapatos</a>
                        <a href="/products/?category=accesorios">Accesorios</a>
                        <a href="">Login</a>
                    </nav>
                    <h2 class="title">Productos</h2>
                </body>
            </html>
        `
        expect(getNavBar(path)).toBe(expectedHTML);
    })
});

describe('getProducts', () => {
    it('should return HTML with products', () => {
        const path = '/products/'
        const products = [
            { _id: 1, name: 'Product 1', description: 'Description 1', image: '', price: 10, category: 'Category 1', size: 'M' },
            { _id: 2, name: 'Product 2', description: 'Description 2', image: '', price: 20, category: 'Category 2', size: 'L' }
        ];
        const expectedHTML = `
                    <div class="product-card">
                        <h3>Product 1</h3>
                        <img src="/images/" alt="Product 1">
                        <p>Description 1</p>
                        <p>10€</p>
                        <button><a href="${path}1">Ver</a></button>
                    </div>
                    <div class="product-card">
                        <h3>Product 2</h3>
                        <img src="/images/" alt="Product 2">
                        <p>Description 2</p>
                        <p>20€</p>
                        <button><a href="${path}2">Ver</a></button>
                    </div>`

        expect(getProducts(path, products)).toBe(expectedHTML);
    })
});

describe('showProducts', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return HTML with products', async () => {
        const mockProducts = [
            { name: "camiseta", description: "camiseta con logo", price: 15, image:"", category: "camisetas", size: "M"},
            { name: "pantalones", description: "pantalones rotos", price: 30, image:"", category: "pantalones", size: "L"}
        ];

        Product.find.mockResolvedValue(mockProducts);
       
        /*const result = await showProducts();        
        expect(Product.find).toHaveBeenCalledTimes(1);      
        expect(result).toContain("camiseta");
        expect(result).toContain("pantalones");*/
    });

    it('should throw an error if the product does not exist', async () => {
        Product.find.mockRejectedValue('Error getting products');
        /*await expect(showProducts()).rejects.toMatch('Error getting products');
        expect(Product.find).toHaveBeenCalledTimes(1);*/
    });    
});

describe('showProductById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return HTML with the specified product by ID', async () =>{ 
        const mockProducts = {name: "camiseta", description: "camiseta con logo", price: 15, image:"", category: "camisetas", size: "M"};
        Product.findById.mockResolvedValue(mockProducts)
        /*const result = await showProductById('someProductId');
        expect(Product.findById).toHaveBeenCalledWith('someProductId')
        expect(result).toContain("camiseta");*/
    });
    it('should throw an error if the product does not exist', async ()=> {
        Product.findById.mockResolvedValue(null);
       /* await expect(showProductById('nonExistentId')).rejects.toThrow('Product not found')
        expect(Product.findById).toHaveBeenCalledWith('nonExistentId');*/
    });
});

describe('showProductsLogin', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return HTML with products', async () => {
        const mockProducts = [
            { name: "camiseta", description: "camiseta con logo", price: 15, image:"", category: "camisetas", size: "M"},
            { name: "pantalones", description: "pantalones rotos", price: 30, image:"", category: "pantalones", size: "L"}
        ];

        Product.find.mockResolvedValue(mockProducts);
       
        /*const result = await showProducts();        
        expect(Product.find).toHaveBeenCalledTimes(1);      
        expect(result).toContain("camiseta");
        expect(result).toContain("pantalones");*/
    });

    it('should throw an error if the product does not exist', async () => {
        Product.find.mockRejectedValue('Error getting products');
        /*await expect(showProducts()).rejects.toMatch('Error getting products');
        expect(Product.find).toHaveBeenCalledTimes(1);*/
    });    
});

describe('showProductByIdLogin', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return HTML with the specified product by ID', async () =>{ 
        const mockProducts = {name: "camiseta", description: "camiseta con logo", price: 15, image:"", category: "camisetas", size: "M"};
        Product.findById.mockResolvedValue(mockProducts)
        /*const result = await showProductById('someProductId');
        expect(Product.findById).toHaveBeenCalledWith('someProductId')
        expect(result).toContain("camiseta");*/
    });
    it('should throw an error if the product does not exist', async ()=> {
        Product.findById.mockResolvedValue(null);
       /* await expect(showProductById('nonExistentId')).rejects.toThrow('Product not found')
        expect(Product.findById).toHaveBeenCalledWith('nonExistentId');*/
    });
}); 

/*describe('showNewProductForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return HTML for the new product form', async () => {
        const result = await showNewProductForm();
        expect(result).toContain(`<label for="name">Nombre:</label>`);
        expect(result).toContain(`<label for="description">Descripción:</label>`);
        expect(result).toContain(`<label for="price">Precio:</label>`);
    });
    it('should throw an error if the new product form does not exist', async () => {

    })
})

describe('createProduct', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new product', async () => {
        const newMockProduct = {name: "nuevo producto", description: "descripción del nuevo producto", price: 20, image:"", category: "categoría del nuevo producto", size: "M"};

        await createProduct(newMockProduct);
        
        expect(Product.create).toHaveBeenCalledWith(newMockProduct);
    });
});


describe('updateProductById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should update an existing product', async () => {
        const updatedMockProduct = {name: "producto actualizado", description: "descripción actualizada", price: 25, image:"", category: "categoría actualizada", size: "L"};
        await updateProductById('someProductId', updatedMockProduct);
        expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('someProductId', updatedMockProduct, {new: true});
    });
});

describe('showEditProductForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return HTML for the edit product form', async () => {
        const mockProduct = { 
            name: "producto a editar", description: "descripción del producto a editar", price: 30, image:"", category: "categoría del producto a editar", size: "XL"}; 
        Product.find.mockResolvedValue(mockProduct);
        const result = await showEditProductForm('someProductId');
        expect(Product.find).toHaveBeenCalledWith('someProductId')
        expect(result).toContain(`<label for="name">Nombre:</label>`);
        expect(result).toContain(`<label for="description">Descripción:</label>`);
        expect(result).toContain(`<label for="price">Precio:</label>`);        
    });
    it('should throw an error if the product does not exist', async () => {
        Product.find.mockRejectedValue(null);
        await expect(showEditProductForm('nonExistentId')).rejects.toThrow('Product not exist');
        expect(Product.find).toHaveBeenCalledWith('nonExistentId');
    }); 
});

*/
/*describe('deleteProductById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete an existing product', async () => {
        const mockProduct = {
            _id: 1524685,
            name: 'Producto a eliminar',
            description: 'Producto a eliminar',
            price: 20,
            image: '',
            category: 'camisetas',
            size: 'XS'
        }
        Product.findByIdAndDelete.mockResolvedValue(mockProduct);

        await deleteProductById('someProductId');        
        expect(Product.findByIdAndDelete).toHaveBeenCalledWith('someProductId');
    });
});*/
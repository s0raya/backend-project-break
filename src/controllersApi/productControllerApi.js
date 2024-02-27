const Product = require('../models/Product');

//Funcion para obtener la barra de navegación, teniendo en cuenta la ruta.
const getNavBar = (path, category) => {
    let html = '';
    if(path === '/dashboard' || path === '/dashboard/') {
        html = `
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
                        <a href="/dashboard">Productos</a>
                        <a href="/dashboard/?category=Camisetas">Camisetas</a>
                        <a href="/dashboard/?category=Pantalones">Pantalones</a>
                        <a href="/dashboard/?category=Zapatos">Zapatos</a>
                        <a href="/dashboard/?category=Accesorios">Accesorios</a>
                        <a href="/dashboard/new">Nuevo Producto</a>
                        <a href="">Logout</a>   
                    </nav>
                </body>
            </html> 
        `
    } else {
        html = `
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
                    <a href="/products">Productos</a>
                    <a href="/products/?category=Camisetas">Camisetas</a>
                    <a href="/products/?category=Pantalones">Pantalones</a>
                    <a href="/products/?category=Zapatos">Zapatos</a>
                    <a href="/products/?category=Accesorios">Accesorios</a>
                    <a href="">Login</a>   
                    </nav>  
                </body>
            </html>
        `
    }
    return html;
};

//Funcion para pintar por pantalla todos los productos, teniendo en cuenta la ruta.
const getProducts = (path, products) => {
    let html = '';
    for(let product of products) {
        html += `
            <h2 class="title">Productos</h2>
            <div class="product-card">
                <h3>${product.name}</h3>
                <img src="/images/${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <button><a href="${path}/${product._id}">Ver</a></button>
            </div>
        `;
    }
    return html;
};

//Función para ver el detalle de un producto, teniendo en cuenta la ruta.
const getProduct = (path, product) => {
    let html = '';
    if(path === '/dashboard'  || path === '/dashboard/') {
        html += `
            <div class="product-details">
                <h2>${product.name}</h2>
                <img src="/images/${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoria: ${product.category}</p>
                <p>Talla: ${product.size}</p>
                <button><a href="${path}/${product._id}/edit">Editar</a></button>
                <button><a href="${path}/${product._id}/delete">Borrar</a></button>
            </div>
        `
    } else {
        html += `
            <div class="product-details">
                <h2>${product.name}</h2>
                <img src="/images/${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoria: ${product.category}</p>
                <p>Talla: ${product.size}</p>
            </div>
        `
    }
    return html;
};

const showProducts = async (req, res) => {
    try {
        const path = req.path;
        const products = await Product.find();
        res.json({ navbar: getNavBar(path), products: getProducts(path, products) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const showProductById = async (req, res) => {
    try {
        const path = req.path;
        const product = await Product.findById(req.params.productId);
        res.json({ navbar: getNavBar(path), product: getProduct(path, product) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const showProductsLogin = async (req, res) => {
    try {
        const path = req.path;
        const products = await Product.find();
        res.json({ navbar: getNavBar(path), products: getProducts(path, products) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const showProductByIdLogin = async (req, res) => {
    try {
        const path = req.path.includes('/dashboard') ? '/dashboard' : '';
        const product = await Product.findById(req.params.productId);
        res.json({ navbar: getNavBar(path), product: getProduct(path, product) });
    } catch (error) {
        console.log("Find product by id: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, size } = req.body;
        const product = await Product.create({ name, description, price, image, category, size });
        res.status(201).json({ message: "Product Created Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const updateProductById = async (req, res) => {
    try {
        const { name, description, price, image, category, size } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, { name, description, price, image, category, size }, { new: true });
        res.json({ message: "Product Updated Successfully", updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.json({ message: "Product Deleted Successfully", deletedProduct: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getNavBar,
    getProducts,
    getProduct,
    showProducts,
    showProductById,
    showProductsLogin,
    showProductByIdLogin,
    createProduct,
    updateProductById,
    deleteProductById
};
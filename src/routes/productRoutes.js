const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');

const getNavBar = (path, category) => {
    let html = '';
    if(path === '/dashboard') {
        html = `
            <nav class="navbar">
                <a href="/dashboard">Productos</a>
                <a href="${path}/?category=Camisetas">Camisetas</a>
                <a href="${path}/?category=Pantalones">Pantalones</a>
                <a href="${path}/?category=Zapatos">Zapatos</a>
                <a href="${path}/?category=Accesorios">Accesorios</a>
                <a href="${path}/dashboard/new">Nuevo Producto</a>
                <a href="">Logout</a>   
            </nav>
        `
    } else {
        html = `
            <nav class="navbar">
            <a href="/products">Productos</a>
            <a href="${path}/?category=Camisetas">Camisetas</a>
            <a href="${path}/?category=Pantalones">Pantalones</a>
            <a href="${path}/?category=Zapatos">Zapatos</a>
            <a href="${path}/?category=Accesorios">Accesorios</a>
            <a href="">Login</a>   
        </nav>  
        `
    }
    return html;
};

const getProducts = (path, products) => {
    let html = '';
    for(let product of products) {
        html += `
            <div class="product-card">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <button><a href="${path}/${product._id}">Ver</a></button>
            </div>
        `;
    }
    return html;
};

const getProduct = (path, product) => {
    let html = '';
    if(path === '/dashboard') {
        html += `
            <div class="product-details">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoria: ${product.category}€</p>
                <p>${product.size}€</p>
                <button><a href="">Editar</a></button>
                <button><a href="">Borrar</a></button>
            </div>
        `
    } else {
        html += `
            <div class="product-details">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoria: ${product.category}€</p>
                <p>${product.size}€</p>
            </div>
        `
    }
    return html;
}

router.get('/', (req,res) => {
    res.redirect('/products');
})

router.get('/products', async (req,res) => {
    try {
        const path = req.path;
        const products = await Product.find();
        res.send(getNavBar(path) + getProducts(path, products));
    } catch (error) {
        console.log(error);
    }
});

router.get('/products/:productId', async (req,res) => {
    try {
        const path = req.path;
        const product = await Product.findById(req.params.productId);
        res.send(getNavBar(path) + getProduct(path, product));
    } catch (error) {
        console.log(error);
    }
});

router.get('/dashboard/:productId', async (req,res) => {
    try {
        const path = req.path.includes('dashboard') ? '/dashboard' : '';
        const product = await Product.findById(req.params.productId);
        res.send(getNavBar(path) + getProduct(path, product));
    } catch (error) {
        console.log(error);
    }
});

router.get('/dashboard/new', (req,res) => {
    res.send(`
        <h2>Crear Producto</h2>
    
    `)
})

router.get('/dashboard', async (req,res) => {
    try {
        const path = req.path;
        const products = await Product.find();
        res.send(getNavBar(path) + getProducts(path, products));
    } catch (error) {
        console.log(error);
    }
})


/*router.post('/', async (req,res) => {
    try {
        if(req.file) {
            const { filename } = req.file;
            product.setImage(filename);
        }
        const product = await Product.create({...req.body});
        res.status(201).send({message: "Product successfully created", product});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "There was a problem trying to create a product" });
    }
})*/


module.exports = router;
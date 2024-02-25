const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');

const getNavBar = (path, category) => {
    let html = '';
    if(path === '/dashboard' || path === '/dashboard/') {
        html = `
            <nav class="navbar">
                <a href="/dashboard">Productos</a>
                <a href="/dashboard/?category=Camisetas">Camisetas</a>
                <a href="/dashboard/?category=Pantalones">Pantalones</a>
                <a href="/dashboard/?category=Zapatos">Zapatos</a>
                <a href="/dashboard/?category=Accesorios">Accesorios</a>
                <a href="/dashboard/new">Nuevo Producto</a>
                <a href="">Logout</a>   
            </nav>
        `
    } else {
        html = `
            <nav class="navbar">
            <a href="/products">Productos</a>
            <a href="/products/?category=Camisetas">Camisetas</a>
            <a href="/products/?category=Pantalones">Pantalones</a>
            <a href="/products/?category=Zapatos">Zapatos</a>
            <a href="/products/?category=Accesorios">Accesorios</a>
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
            <h2 class="title">Productos</h2>
            <div class="product-card">
                <h3>${product.name}</h3>
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
                <p>Categoria: ${product.category}</p>
                <p>Talla: ${product.size}</p>
                <button><a href="">Editar</a></button>
                <button><a href="${path}/${product._id}/delete">Borrar</a></button>
            </div>
        `
    } else {
        html += `
            <div class="product-details">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoria: ${product.category}</p>
                <p>Talla: ${product.size}</p>
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

router.get('/dashboard', async (req,res) => {
    try {
        const path = req.path;
        const products = await Product.find();
        res.send(getNavBar(path) + getProducts(path, products));
    } catch (error) {
        console.log(error);
    }
});

router.get('/dashboard/new', async (req,res) => {
    const path = req.path.includes('/dashboard') ? '/dashboard' : '';
    try {
        res.send(`
        ${getNavBar(path)}
            <div class="new-product">
                <h2>Crear producto</h2>
                <div class="form">
                    <form action="/dashboard" method="post">
                        <div>
                            <label for="name">Nombre:</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div>
                            <label for="description">Descripción:</label>
                            <textarea id="description" name="description" required></textarea>
                        </div>
                        <div>
                            <label for="price">Precio:</label>
                            <input type="number" id="price" name="price" required>
                        </div>
                        <div>
                            <label for="image">Imagen:</label>
                            <input type="text" id="image" name="image">
                        </div>
                        <div>
                            <label for="category">Categoría:</label>
                            <select name="category" id="category">
                                <option value="camisetas">Camisetas</option>
                                <option value="pantalones">Pantalones</option>
                                <option value="zapatos">Zapatos</option>
                                <option value="accesorios">Accesorios</option>
                            </select>
                        </div>
                        <div>
                            <label for="size">Talla:</label>
                            <select name="size" id="size">
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <button type="submit">Crear</button>
                    </form>
                </div>
            </div>
        `)
    } catch (error) {
        
    }
});

router.get('/dashboard/:productId', async (req,res) => {
    try {
        const path = req.path.includes('/dashboard') ? '/dashboard' : '';
        const product = await Product.findById(req.params.productId);
        res.send(getNavBar(path) + getProduct(path, product));
    } catch (error) {
        console.log("Find product by id: ", error);
    }
});

router.get('/dashboard/:productId/delete', async (req,res) => {
    const path = req.path.includes('/dashboard') ? '/dashboard' : '';
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.send(getNavBar(path) + 'Product deleted');
    } catch (error) {
        console.log(error);
        res.status(500).send(getNavBar(path) + 'There was a problem trying to delete a product')
    }
});

router.post('/dashboard', async (req,res) => {
    try {
        const { name, description, price, image, category, size } = req.body;
        const product = await Product.create({ name, description, price, image, category, size });
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "There was a problem trying to create a product" });
    }
})


module.exports = router;
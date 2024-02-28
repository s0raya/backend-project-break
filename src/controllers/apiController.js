const Product = require('../models/Product');

const showProductsApi = async (req, res) => {
    try {
        const products = await  Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was a problem trying get all products"})   
    }
};

const showProductByIdApi =async (req,res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product){
            return res.status(404).json({message: "No product found"});
         }
         res.json(product);
    }catch (error) {
        console.log(error)
        res.status(500).json({message:"Error getting the product."})
    }
};

const showProductsLoginApi = async (req, res) => {
    try {
        const products = await  Product.find();
        res.json(products);
    } catch (error) {
        console.log(error);
        
    }
};

const showProductByIdLoginApi = async (req,res) => {
    try {
        const path = req.path.includes('/dashboard') ? '/dashboard' : '';
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        console.log("Find product by id: ", error);
    }
};

const createProductApi = async (req, res) => {
    try {
        const { name, description, price, image, category, size } = req.body;
        const product = await Product.create({ name, description, price, image, category, size });
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was a problem trying to create a product" });
    }
};

const updateProductByIdApi = async (req, res) => {
    try {
        const { name, description, price, image, category, size } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, { name, description, price, image, category, size }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "No product found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hubo un problema al actualizar el producto" });
    }
};


const deleteProductByIdApi = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hubo un problema al eliminar el producto" });
    }
};

module.exports = {
    showProductsApi,
    showProductByIdApi,
    showProductsLoginApi,
    showProductByIdLoginApi,
    createProductApi,
    updateProductByIdApi,
    deleteProductByIdApi
}

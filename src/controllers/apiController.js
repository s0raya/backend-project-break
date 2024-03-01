const Product = require('../models/Product');

const apiController = {
    async showProductsApi(req, res) {
        try {
            const products = await  Product.find();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "There was a problem trying get all products"})   
        }
    },

    async showProductByIdApi(req,res) {
        try {
            const product = await Product.findById(req.params.productId);
            if(!product){
                return res.status(404).json({message: "Product not found"});
            }
            res.json(product);
        }catch (error) {
            console.log(error)
            res.status(500).json({message:"Error getting the product." + req.params._id})
        }
    },

    async createProductApi(req, res) {
        try {
            const product = await Product.create({...req.body });
            res.status(200).json({message: "Product succesfully created", product});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "There was a problem trying to create a product" });
        }
    },

    async updateProductByIdApi(req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {...req.body}, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product successfully updated", updatedProduct});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "There was a problem trying to update a product" + req.params._id });
        }
    },

    async deleteProductByIdApi (req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "There was a problem trying to delete a product" });
        }
    }
}

module.exports = apiController;

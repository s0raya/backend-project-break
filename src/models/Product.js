const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        image: String,
        category: {
            type: String,
            enum: ['camisetas', 'pantalones', 'zapatos', 'accesorios'],
            required: true
        },
        size: {
            type: String,
            enum: ['XS', 'S', 'M', 'L', 'XL'],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    },
    { timestamps: true},
);

const Product = mongoose.model('Product', ProductSchema);

ProductSchema.methods.setImage = function setImage(filename) {
    this.image = `http://localhost/${process.env.PORT}/public/${filename}`
}

module.exports = Product;
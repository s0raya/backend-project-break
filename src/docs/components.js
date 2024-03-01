module.exports = {
    components: {
        schemas: {
            Product:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:"product identification number",
                        example:"65dd112872bd462a50cfcfac"
                    },
                    name:{
                        type: 'string',
                        description:'Product name',
                        example:'Pantalones molones',
                    },
                    description:{
                        type:'string',
                        description: 'Product description',
                        example:'Pantalones rotos estampados',
                    },
                    image:{
                        type: 'string',
                        description: 'Product image',
                    },
                    category:{
                        type: 'string',
                        description: 'Product category',
                        example:"pantalones",
                        enum: ['camisetas', 'pantalones', 'zapatos', 'accesorios'],                  },
                    size:{
                        type: 'string',
                        example: "M",
                        enum: ["XS", "S", "M", "L", "XL"],
                        description: 'product size',
                    },
                    price:{
                        type: 'number',
                        example: "12.5",
                        description: 'price of the product',
                    }
                }
            },
            ProductInput: {
                type: 'object',
                properties: {
                    name:{
                        type: 'string',
                        description:'Product name',
                        example:'Pantalones molones',
                    },
                    description:{
                        type:'string',
                        description: 'Product description',
                        example:'Camiseta molona',
                    },
                    image:{
                        type: 'string',
                        description: 'Product image',
                    },
                    category:{
                        type: 'string',
                        description: 'Product category',
                        enum: ['camisetas', 'pantalones', 'zapatos', 'accesorios'],
                        example: "camisetas"
                    },
                    size:{
                        type: 'string',
                        enum: ["XS", "S", "M", "L", "XL"],
                        description: 'product size',
                        example: "M"
                    },
                    price:{
                        type: 'number',
                        description: 'price of the product',
                        example: 12.5                      
                    }
                }
            }
        }
    }
}
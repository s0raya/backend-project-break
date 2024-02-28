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
                        required: true
                    },
                    description:{
                        type:'string',
                        description: 'Product description',
                        example:'Pantalones rotos estampados',
                        required: true
                    },
                    image:{
                        type: 'string',
                        description: 'Product image',
                        required: false
                    },
                    category:{
                        type: 'string',
                        description: 'Product category',
                        enum: ['camisetas', 'pantalones', 'zapatos', 'accesorios'],
                        required: true
                    },
                    size:{
                        type: 'string',
                        description: 'product size',
                    },
                    price:{
                        type: 'number',
                        description: 'price of the product',
                        required: true
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
                        required: true
                    },
                    description:{
                        type:'string',
                        description: 'Product description',
                        example:'Pantalones rotos estampados',
                        required: true
                    },
                    image:{
                        type: 'string',
                        description: 'Product image',
                        required: false
                    },
                    category:{
                        type: 'string',
                        description: 'Product category',
                        enum: ['camisetas', 'pantalones', 'zapatos', 'accesorios'],
                        required: true
                    },
                    size:{
                        type: 'string',
                        description: 'product size',
                    },
                    price:{
                        type: 'number',
                        description: 'price of the product',
                        required: true
                    }
                }
            }/*,
            _id:{
                type:'objectId',
                description:"task identification number",
                example:"65dd112872bd462a50cfcfac"
            }*/
        }
    }
}
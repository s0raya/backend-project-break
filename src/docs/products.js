module.exports = {
    paths: {
        "/api/products":{
            get:{
                tags: ["Products"],
                summary: "Get all products",
                operationId: "GetProducts",
                parameters:[],             
                responses: {
                    200: { 
                        description: "Products obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product"
                                }
                            }
                        },
                    },    
                    500: { description: "There was a problem trying get all products" }
                },
            }
        },
        "/api/products/{productId}":{
            get:{
                tags: ["Shop"],
                /*summary: "Get a product by ID",
                operationId: "GetProductById",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        description: "ID of the product to get",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Product obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/_id"
                                }
                            }
                        }
                    }
                    
                }
            }*/
            }
        },
        "/api/dashboard":{
            get:{
                tags: ["Shop"],
                /*summary: "Get products for the dashboard",
                operationId: "GetProductsForDashboard",
                responses: {
                    200: {
                        description: "Products obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                    
                }
            },
            */
            }
        },
        "/api/dashboard/new":{
            get:{
                tags: ["Shop"],
            }
        },
        "/api/dashboard/:productId":{
            get:{
                tags: ["Shop"],
            }
        },
        "/api/dashboard":{
            post: {
                tags: ["Shop"],/*
                summary: "Create a new product",
                operationId: "CreateProduct",
                parameters:[
                    {
                        name:"product",
                        in:"body",
                        required:true,
                        schema:{
                            $ref:"#/components/schemas/ProductInput"
                responses: {
                    201: { description: "Product created" },
                }
            }*/
                
            },
        },
        "/api/dashboard/:productId":{
            put:{
                tags: ["Shop"],
            },
        },
        "/api/dashboard/:productId/edit":{
            get:{
                tags: ["Shop"],
            }
        },
        "/api/dashboard/:productId/delete":{
            get:{
                tags: ["Shop"],
            }
        }
    }
}
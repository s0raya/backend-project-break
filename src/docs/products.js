module.exports = {
    paths: {
        "/products":{
            get:{
                tags: ["Shop"],
                summary: "Get all products",
                operationId: "GetProducts",
                parameters:[],             
                responses: {
                    200: { description: "Products obtained"},
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product"
                                }
                            }
                        },
                    500: { description: "There was a problem trying get all products" },
                },
            }
        },
        "/dashboard": {
            post: {
                tags: ["Shop"],
                summary: "Create product",
                operationId: "createProduct",
                parameters: [],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProductInput",
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Product succesfully created",},
                    500: { description: "There was a problem trying to create a product"},
                }
            },
            get:{
                tags: ["Shop"],
                summary: "Get products for the dashboard",
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
        },
        "/products/{productId}":{
            get:{
                tags: ["Shop"],
                summary: "Get a product by ID",
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
            }
        },
        "/dashboard/:productId":{
            get:{
                tags: ["Shop"],
                summary: "Get product by id",
                operationId: "getProductById",
                parameters: [
                    {
                        name: "_id",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/Product/properties/_id",
                        },
                        description: "Id of Product to obtain",
                    },
                ],
                responses: {
                    200: { description: "Product obtained"},
                    500: { description: "There was a problem with the product with _id number"}
                },
            },
            put:{
                tags: ["Shop"],
                summary: "Update a product",
                operationId: "UpdateProduct",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/Product/properties/_id",
                    },
                    description: "Id of product to be updated"
                }],
                responses: {
                    200: { description: "Product successfully updated"},
                    404: { description: "Product not found"},
                    500: { description: "There was a problem trying to update a product"}
                }
            },
        },
        "/dashboard/:productId/delete":{
            get:{
                tags: ["Shop"],
                summary: "Delete product by id",
                operationId: "deleteProductById",
                parameters: [
                    {
                        name: "_id",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/Product/properties/_id",
                        },
                        description: "Id of product to delete",
                    },
                ],
                responses: {
                    200: { description: "Product deleted"},
                    404: { description: "Product not found"},
                    500: { description: "There was a problem trying to delete a product"}
                }
            }
        }
    }
}

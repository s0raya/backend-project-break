module.exports = {
    paths: {
        "/api/products":{
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
        "/api/dashboard": {
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
        },
        "/api/products/{productId}":{
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
                                    $ref: "#/components/schemas/Product"
                                }
                            }
                        }
                    }
                    
                }
            }
        },
        "/api/dashboard/{_id}":{
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
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProductInput"
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Product successfully updated"},
                    404: { description: "Product not found"},
                    500: { description: "There was a problem trying to update a product"}
                }
            },
        },
        "/api/dashboard/{_id}/delete":{
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

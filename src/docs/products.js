module.exports = {
    paths: {
        "/api/products":{
            get:{
                tags: ["Shop"],
                summary: "Get all products",
                operationId: "GetProducts",
                parameters:[],
                responses: {
                    201: { description: "Products obtained" },
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    },
                    500: { description: "There was a problem trying get all products" }
                },
            }
        },
        "/api/products/:productId":{
            get:{
                tags: ["Shop"],
            }
        },
        "/api/dashboard":{
            get:{
                tags: ["Shop"],
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
            post:{
                tags: ["Shop"],
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
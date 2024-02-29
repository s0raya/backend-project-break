const express = require('express');
const app = express();
const dbConnection = require('./config/db.js');
const routes = require('./routes/productRoutes.js');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index.js');
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', routes);
app.use('/api', swaggerUI.serve, swaggerUI.setup(docs));

dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
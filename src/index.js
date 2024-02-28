const express = require('express');
const app = express();
const methodOverride = require('method-override');
const dbConnection = require('./config/db.js');
const routes = require('./routes/productRoutes.js');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index.js');
const swaggerUIDist = require('swagger-ui-dist');
const path = require('path');
const PORT = process.env.PORT || 3000;



app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static('public'));



app.use('/api', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));

app.use('/', routes);
dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
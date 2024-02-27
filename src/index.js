const express = require('express');
const app = express();
const methodOverride = require('method-override');
const dbConnection = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const PORT = process.env.PORT || 3000;
const productRoutesApi = require('./routesApi/productRoutesApi.js')


app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use('/', productRoutes);
app.use('/api', productRoutesApi)

dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
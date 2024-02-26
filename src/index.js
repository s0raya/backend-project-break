const express = require('express');
const app = express();
const methodOverride = require('method-override');
const dbConnection = require('./config/db.js');
const routes = require('./routes/productRoutes.js');
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/public', express.static(`../${__dirname}/public/images`));

app.use('/', routes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
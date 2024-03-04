const express = require('express');
const app = express();
const dbConnection = require('./config/db.js');
const routes = require('./routes/productRoutes.js');
const apiRoutes = require("./routes/apiRoutes.js");
const authRoutes = require('./routes/authRoutes.js')
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index.js');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const hashedSecret = require('./config/config.js');


app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: hashedSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
);
app.use(express.static('public'));

app.use('/api', apiRoutes, swaggerUI.serve, swaggerUI.setup(docs));
app.use('/', routes);
app.use('/', authRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
const express = require('express');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const dbConnection = require('./config/db.js');
const routes = require('./routes/productRoutes.js');
const apiRoutes = require("./routes/apiRoutes.js");
const authRoutes = require('./routes/authRoutes.js')
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index.js');
const PORT = process.env.PORT || 8080;
const session = require('express-session');
const hashedSecret = require('./config/config.js');


app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection:'sessions'

});
store.on('error', function (err) {
    console.log('Session Store Error', err);
});

app.use(
    session({
        secret: hashedSecret,
        name: 'Shop',
        resave: false,
        saveUninitialized: true,
        store: store,
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
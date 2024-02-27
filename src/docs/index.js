const basicInfo = require('./basicInfo.js');
const components = require('./components.js');
const products = require('./products.js');
module.exports = {
    ...basicInfo,
    ...components,
    ...products
}
const session = require('express-session');
require('dotenv').config();

const checkSession =  (req, res, next) => {
    if(req.session.username && req.session){
        return next()
    }else{
        res.redirect('/login');
    }
}

module.exports = checkSession;
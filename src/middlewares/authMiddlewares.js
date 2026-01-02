const app = require('../config/firebase');
const { getAuth } = require('firebase/auth');
const auth = getAuth(app)

function checkSession(req,res,next) {
    const user = auth.currentUser;
    if(user) {
        next();
    } else {
        res.redirect('/login/');
    }
}

module.exports = checkSession;
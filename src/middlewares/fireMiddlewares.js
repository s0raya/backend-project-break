const checkSession =  (req, res, next) => {
    if(req.session.user && req.session){
        next()
    }else{
        res.redirect('/login');
    }
}

module.exports = checkSession;
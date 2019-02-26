module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
        req.flash('error', 'You Must Login First To See This Page');
        return res.redirect('/login');
    }
    next();
}
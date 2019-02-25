exports.index = (req, res, next) => {
    res.render('index', {
        pageTitle: "Home | الرئيسية",
        user: req.session.user
    });
}
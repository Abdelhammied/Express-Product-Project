exports.index = (req, res, next) => {
    res.render('category.index', {
        pageTitle: "Categories | الماركات"
    })
}
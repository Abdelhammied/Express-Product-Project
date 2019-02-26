const Category = require('../models/Category');
exports.index = (req, res, next) => {
    res.render('category.index', {
        pageTitle: "Categories | الماركات"
    })
}

exports.create = (req, res, next) => {
    let errors = res.render('category.create', {
        pageTitle: "New Category | ماركة جديدة",
        csrfToken: req.csrfToken(),
    })
}

exports.store = (req, res, next) => {
    const category_name = req.body.category_name;
    let back = req.header('Refer') || '/';
    Category.findOne({
        category: category_name
    }).then(category => {
        if (category) {
            req.flash('error', 'This Category Already Exists');
            return res.redirect(back);
        }
        const newCategory = new Category({
            name: category_name
        });
        newCategory.save()
            .then(data => {
                req.flash('error', 'Category Was Inserted Successfully !');
                res.redirect('/category/all');
            }).catch(err => {
                console.log(err);
            })
    })
}
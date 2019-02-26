const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = (req, res, next) => {
    let errors = req.flash('error');
    if (!errors.length > 0) {
        errors = null
    }
    res.render('auth.login', {
        pageTitle: "Login | تسجيل دخول",
        errors: errors
    })
}

exports.loginPost = (req, res, next) => {
    const user_email = req.body.user_email;
    const password = req.body.password;


    User.findOne({
        email: user_email
    }).then(user => {
        if (!user) {
            req.flash('error', 'This Email Is Not Exists !');
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password).then(result => {
            if (!result) {
                req.flash('error', 'This Credintials Is Not Valid !');
                return res.redirect('/login');
            }
            req.session.user = user;
            req.session.isAuth = true;
            res.redirect('/');
        })
    })
}

exports.register = (req, res, next) => {
    let errors = req.flash('error');
    if (!errors.length > 0) {
        errors = null;
    }
    res.render('auth.register', {
        pageTitle: "Register | عضوية جديدة",
        errors: errors
    })
}

exports.registerPost = (req, res, next) => {
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const password = req.body.password;
    User.findOne({
        email: user_email
    }).then(email => {
        if (email) {
            req.flash('error', 'This Email Already Exists !...');
            return res.redirect('/register');
        }
        bcrypt.hash(password, 12).then(hashedPass => {
            const newUser = new User({
                username: user_name,
                email: user_email,
                password: hashedPass
            })
            newUser.save().then(user => {
                req.session.user = user;
                req.session.isAuth = true;
                res.redirect('/');
            })
        })
    }).catch(Err => {
        console.log(Err);
    })
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
}
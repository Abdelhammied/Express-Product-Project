const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = (req, res, next) => {
    res.render('auth.login', {
        pageTitle: "Login | تسجيل دخول"
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
                req.session.isAuth = true;
                req.session.user = user ;
                return res.redirect('/home')
            })
        })
    }).catch(Err => {
        console.log(Err);
    })
}
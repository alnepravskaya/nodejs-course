exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthed: req.session.isLoggedIn
    });
};


exports.postLogin = (req, res) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
};

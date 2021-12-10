const { Router } = require('express');
const router = Router();
const passport = require('passport')

router.get('/singup', Auth, (req, res) => {
  res.render('auth/singup.hbs')
}); 

router.post('/singup', Auth, passport.authenticate('local-singup', {
  successRedirect: '/profile',
  failureRedirect: '/singup',
  failureFlash: true
}));

router.get('/singin', Auth, (req, res) => {
  res.render('auth/singin.hbs');
});

router.post('/singin', Auth, passport.authenticate('local-singin', {
  successRedirect: '/profile',
  failureRedirect: '/singin',
  failureFlash: true
})); 

router.get('/profile', function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  };
  res.redirect('/singin')
}, (req, res) => {
  res.render('profile')
});

function Auth (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  };
  res.redirect("/profile");
};

module.exports = router;

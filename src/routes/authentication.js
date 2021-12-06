const { Router } = require('express');
const router = Router();
const passport = require('passport')

router.get('/singup', function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  };
  res.redirect('/profile')
},(req, res) => {
  res.render('auth/singup.hbs')
}); 

router.post('/singup', function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  };
  res.redirect('/profile')
},passport.authenticate('local-singup', {
  successRedirect: '/profile',
  failureRedirect: '/singup',
  failureFlash: true
}));

router.get('/singin', function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  };
  res.redirect('/profile')
},(req, res) => {
  res.render('auth/singin.hbs');
});

router.post('/singin', function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  };
  res.redirect('/profile')
},passport.authenticate('local-singin', {
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

module.exports = router;

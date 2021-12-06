const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('index')
}); 

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/singin');
})

module.exports = router;


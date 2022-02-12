const { Router } = require('express');
const router = Router();

const pool = require('../database.js');

router.get('/add', function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect('/singin')
}, (req, res) => {
  res.render("links/add.hbs")
})

router.post('/add', function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect('/singin')
}, async (req, res) => {
  const { title, url, description } = req.body;

  const newLink = {
    title,
    url,
    description,
    user_id: req.user.id
  };

  await pool.query("INSERT INTO links set ?", [ newLink ])
  req.flash('Success', 'Links saved successfully!');
  res.redirect('/links')
});

router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect('/singin')
}, async (req, res) => {
  const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [ req.user.id ])
  res.render('links/list.hbs', { links })
});

router.get('/delete/:id', function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect('/singin')
}, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM links WHERE ID = ?', [ id ]);
  req.flash('Success', 'Links reoved successfully!')
  res.redirect('/links')
});

router.get('/edit/:id', function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect('/singin')
}, async (req, res) => {
  const { id } = req.params;
  const links = await pool.query('SELECT * FROM links WHERE id = ?', [ id ])
  res.render('links/edit.hbs', { link: links[0] })
});

router.post('/edit/:id', function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect('/singin')
}, async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const updateLink = {
    title,
    url,
    description
  }
  await pool.query("UPDATE links set ?  WHERE id = ?", [ updateLink, id ])
  req.flash('Success', 'Links updated successfully!')
  res.redirect("/links")
});

module.exports = router;

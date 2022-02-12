const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const pool = require("../database.js")
const helpers = require('../lib/helpers.js')

passport.use('local-singin', new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE username = ?", [ username ]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.comparePassword(password, user.password);
    if (validPassword) {
      done(null, user, req.flash("Success", "Welcome", user.username));
    } else {
      done(null, false, req.flash("message", "Incorrect password"));
    };
  } else {
    done(null, false, req.flash("message", "Username not exist"));
  };
}));

passport.use('local-singup', new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const result = await pool.query("SELECT * FROM users WHERE username = ?",[ username ]);
  if (result.length > 0) {
    done(null, false, req.flash("message", "Este usuario ya existe"))
  } else {
    const { fullname } = req.body;
    const newUser = { username, password, fullname };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query("INSERT INTO users SET ?", [ newUser ]);
    newUser.id = result.insertId;
    return done(null, newUser)
  };
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?",[ id ]);
  done(null, rows[0]);
});


const helpers = {};
const bycrypt = require('bcryptjs');

helpers.encryptPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

helpers.comparePassword = async (password, savedPassword) => {
  try {
    return await bycrypt.compare(password, savedPassword);
  } catch(err) {
    console.log(err);
  };
};

module.exports = helpers;


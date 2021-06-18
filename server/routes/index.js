'use strict'
const login_routes = require('./loginRoutes');
const bank_routes=require('./bankRoutes')

const routes = (app) => {
  login_routes(app);
bank_routes(app)
}
module.exports = routes;

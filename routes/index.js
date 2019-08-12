var express = require('express');
var router = express.Router();
var loadAppRouter = require('./loadRouter.js');
loadAppRouter.load(router);
module.exports = router;

const express = require('express')
const router = express.Router();

const mainUser = require('./user.js')
const account = require('./account.js')

router.use("/user", mainUser)
router.use("/account", account)

module.exports = router
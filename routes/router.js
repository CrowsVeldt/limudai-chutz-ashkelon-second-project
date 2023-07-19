const router = require('express').Router() // create router
const db = require('../db.js');

function getCatalog(req, res) {
    res.send(db)
}

router.get('/catalog', getCatalog)

module.exports = router

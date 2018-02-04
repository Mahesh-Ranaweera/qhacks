var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'geotourist' });
});

/**GET the app window */
router.get('/app', function(req, res, next) {
    res.render('app', {
        title: 'geotourist'
    });
})

module.exports = router;
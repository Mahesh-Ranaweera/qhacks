var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'MobileAR' });
});

/**GET the app window */
router.get('/app', function(req, res, next) {
    res.render('app', {
        title: 'APPWindow'
    });
})

module.exports = router;
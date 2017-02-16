var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var usersCtrl = require('../controllers/users.server.controller');

router.get('/', function (req, res) {
 res.redirect('/users')
});

router.get('/users', function(req, res) {
    return usersCtrl.list(req, res);
});

router.get('/user/:id', function (req, res) {
    return usersCtrl.getById(req, res);
});

router.get('/users/edition/:id', function (req, res) {
    return usersCtrl.edit(req, res);
});

router.put('/users/edition/:id', function (req, res) {
    return usersCtrl.update(req, res);
});

router.delete('/users/:id', function (req, res) {
    return usersCtrl.delete(req, res);
});

/* GET nouveau user */
router.get('/nouveau', function (req,res) {
    return usersCtrl.getUser(req,res)
});

/* POST nouvelle note */
router.post('/nouveau', function (req, res) {
    return usersCtrl.create(req,res)
});

module.exports = router;

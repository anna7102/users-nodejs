var Users = require('../models/users.server.model');
var count = 0;
var objectId = require('mongodb').ObjectID;

exports.list = function (req, res) {
    var query = Users.find();

    query.sort({creeLe: 'desc'})
        .limit(10)
        .exec(function (err, results) {
            res.render('index', {title: 'Utilisateurs', users: results});
        });
};

exports.getUser = function (req, res) {
    res.render('nouveau', { title: 'Nouveau Utilisateur'});
};

exports.getById = function(req, res){

   var rid = req.params.id;

    var query = Users.findOne({id : rid});

    query.exec(function(err,results){
        if(err)
           // res.send('error');
            res.status(500).send(err);
        else if(results)
        {
            console.log('FROM users server controller');
            console.log(results);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ user: results }));
        }
        else
        {
            res.status(404).send('utilisateur pas trouvé');
        }
    });
};

exports.update = function(req, res){

    console.log(req.body);

    var rid = req.body.id;

    var update = {
        nom: req.body.nom,
        email: req.body.email
    };

    var options = {new: true};

    Users.findOneAndUpdate({id : rid}, update, options, function(err,results) {
        if(err)
            res.status(500).send(err);
        else if(results)
        {
            res.status(204).send();
        }
        else
        {
            res.status(404).send('utilisateur pas trouvé');
        }
    });
};

exports.delete = function(req, res){
    var query = {id: req.params.id};

    Users.findOne(query).remove().exec(function(err, result) {
        if (err){
            res.status(500).send(err);
        }
        else {
            res.status(204).send();
        }
    });
};


exports.create = function (req, res) {
    count++;
    var entry = new Users({
        nom: req.body.nom,
        email: req.body.email,
        id: count
    });

    entry.save(function (err) {

        if(err)
        {
            var errMsg = 'Il y a eu une erreur lors de l\'enregistrement d\'un nouveau utilisateur ' + err;
            res.render('nouveau', {title: 'Nouveau Utilisateur (erreur)', message: errMsg});
        }else {
            res.redirect(301, '/users');
        }
    });
};


exports.edit = function (req, res) {

    var rid =  req.params.id;

    Users.findOne({id : rid}, function(err,results) {
        if(err)
        {
            res.render('error');
        }
        else{
            res.render('edition', {title: 'Modifier utilisateur', user : results});

        }
    });
};



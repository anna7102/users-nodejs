var mongoose = require('mongoose');

var nomValidator = [
    function (val) {
    return (val.length > 0 && val.toLowerCase != 'none')
    },
    'Veuillez écrire votre nom'
];

var requiredEmailValidator = [
    function (email) {
        var val2 = email.trim();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val2);
    },
    '{PATH} ne pas valide'
];

var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {type: Number},
    nom: {type: String, required: true, validate: nomValidator, default: ''},
    email: {type: String, required: true, validate: requiredEmailValidator, default: ''},
    creeLe: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', userSchema);



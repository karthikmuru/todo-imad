var mongoose = require('mongoose'), Schema = mongoose.Schema, localMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    email: String,
    password: String
});

Account.plugin(localMongoose);

module.exports = mongoose.model('Account',Account);

'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const imageSchema = new Schema({
    name: String,
    url: String,
    public_ip: String,


});

imageSchema.statics.findAndUpdateById = function(_id) {
    return this.findOneAndUpdate({ _id : _id}, {new: true});
};


module.exports = Mongoose.model('Image', imageSchema);
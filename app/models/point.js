'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const pointSchema = new Schema({
    name: String,
    description: String,
    costalZone: String,
    latitude: String,
    longitude: String,
    image: Buffer,
    contributor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

pointSchema.statics.findById = function(_id) {
    return this.findOne({ _id : _id});
};

pointSchema.statics.remove_POI = function(_id) {
    return this.deleteOne({ _id : _id});
};

pointSchema.statics.update_POI = function(_id) {
    return this.updateOne({ _id : _id});
};


module.exports = Mongoose.model('Point', pointSchema);
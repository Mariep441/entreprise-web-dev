
'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const pointSchema = new Schema({
    name: String,
    description: String,
    costalZone: String,
    coordinates: {
        geo: {
            lat: String,
            long: String
        }
    },
    long: String,
    image: Array,
    contributor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

pointSchema.statics.findById = function(_id) {
    return this.findOne({ _id : _id});
};

pointSchema.statics.findAndUpdateById = function(_id) {
    return this.findAndModify ({ _id : _id});
};

pointSchema.statics.remove_POI = function(_id) {
    return this.deleteOne({ _id : _id});
};

pointSchema.methods.Count = function() {
    return this.count({});
};

module.exports = Mongoose.model('Point', pointSchema);
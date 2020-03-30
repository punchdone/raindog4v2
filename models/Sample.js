const mongoose = require('mongoose');
const { Schema } = mongoose;

const sampleSchema = new Schema({
    type: String,
    material: String,
    finish: String,
    doorName: String,
    doorConstruction: String,
    doorOE: String,
    doorIE: String,
    doorPNL: String,
    doorStileWidth: String,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('samples', sampleSchema);
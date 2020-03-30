const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    billTo: Boolean,
    shipTo: Boolean,
    name: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('addresses', addressSchema);
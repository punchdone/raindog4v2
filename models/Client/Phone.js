const mongoose = require('mongoose');
const { Schema } = mongoose;

const phoneSchema = new Schema({
    phone: String,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('phones', phoneSchema);
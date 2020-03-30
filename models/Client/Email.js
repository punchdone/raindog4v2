const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
    email: String,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('emails', emailSchema);
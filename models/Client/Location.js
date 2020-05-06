const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    title: String,
    address: {
        type: Schema.Types.ObjectId,
        ref: 'addresses'
    },
    phones: [
        {
            type: Schema.Types.ObjectId,
            ref: 'phones'
        }
    ],
    emails: [
        {
            type: Schema.Types.ObjectId,
            ref: 'emails'
        }
    ],
    active: Boolean,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('locations', locationSchema);
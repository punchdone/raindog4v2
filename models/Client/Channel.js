const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema({
    code: String,
    name: String,
    addresses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'addresses'
        }
    ],
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
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'locations'
        }
    ],
    active: Boolean,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('channels', channelSchema);
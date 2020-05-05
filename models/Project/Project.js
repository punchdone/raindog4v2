const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
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
    samples: [
        {
            type: Schema.Types.ObjectId,
            ref: 'samples'
        }
    ],
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'rooms'
        }
    ],
    active: Boolean,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('projects', projectSchema);
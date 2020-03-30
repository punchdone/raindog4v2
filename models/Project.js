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
            ref: 'phoneNumbers'
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
    createdDate: Date
});

mongoose.model('projects', projectSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const finishSchema = new Schema({
    title: String,
    finishType: {
        type: Schema.Types.ObjectId,
        ref: 'selections'
    },
    materials: [
        {
            type: Schema.Types.ObjectId,
            ref: 'selections'
        }
    ],
    productLine: {
        type: Schema.Types.ObjectId,
        ref: 'selections'
    },
    stocking: {
        type: Schema.Types.ObjectId,
        ref: 'selections'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('finishes', finishSchema);
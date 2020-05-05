const mongoose = require('mongoose');
const { Schema } = mongoose;

const selectionSchema = new Schema({
    type: String,
    selection: String,
    attributes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'attributes'
        } 
    ],
    relations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'selections'
        }
    ],
    productLine: Number,
    stockLevel: Number,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('selections', selectionSchema);
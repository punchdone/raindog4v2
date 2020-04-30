const mongoose = require('mongoose');
const { Schema } = mongoose;

const attributeSchema = new Schema({
    type: String,
    Rate: Number,
    UOM: String
});

mongoose.model('attributes', attributeSchema);
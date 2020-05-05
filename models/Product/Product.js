const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const productSchema = new Schema({
    type: {
        type: Schema.Types.ObjectId,
        ref: 'selections'
    },
    configuration: String,
    title: String,
    mods: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
	],
	priceMethod: String,
	price1: Number,
	price2: Number,
	price3: Number,
	price4: Number,
	price5: Number,
	price6: Number,
	price7: Number,
	price8: Number,
    widthmin: Number,
	widthmax: Number,
	widthstd: Number,
	widthfix: Boolean,
	heightmin: Number,
	heightmax: Number,
	heightstd: Number,
	heightfix: Boolean,
	depthmin: Number,
	depthmax: Number,
	depthstd: Number,
	depthfix: Boolean,
	topdrawer: Number,
	lowerdrawer: Number,
	hinging: Boolean,
	door: Number,
	shelves: Number,
	partitions: Number,
	finint: Boolean,
	faceframe: Boolean,
	faces: Number,
	angles: Number,
	price: Number,
    notes: String,
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('products', productSchema);
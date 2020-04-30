const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
	roomNum: Number,
	name: String,
	type: String,
	state: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	orders:  [
		{
			type: Schema.Types.ObjectId,
			ref: 'orders'
		}
	],
	createdDate: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('rooms', roomSchema);
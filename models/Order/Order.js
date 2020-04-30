const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.createConnection('mongodb+srv://rw_user:wood2good@cluster0-dqmci.mongodb.net/test?retryWrites=true&w=majority');

// autoIncrement.initialize(connection);

const orderSchema = new Schema({
	product_line: String,
	wood: {
		type: Schema.Types.ObjectId,
		ref: 'selections'
	},
	construction: {
		type: Schema.Types.ObjectId,
		ref: 'selections',
		default: '5e98e4f01a98e5f153f923f7'
	},
	interior: {
		type: Schema.Types.ObjectId,
		ref: 'selections'
	},
	drawerbox: {
		type: Schema.Types.ObjectId,
		ref: 'selections'
	},
	hinge: {
		type: Schema.Types.ObjectId,
		ref: 'selections'
	},
	guide: {
		type: Schema.Types.ObjectId,
		ref: 'selections'
	},
	door: {
		type: Schema.Types.ObjectId,
		ref: 'selections'
	},
	topdrawer: {
		type: Schema.Types.ObjectId,
		ref: 'selections'
	},
	finish: {
		type: Schema.Types.ObjectId,
		ref: 'finishes'
	},
	lines: [
		{
			type: Schema.Types.ObjectId,
			ref: 'lines'
		}
	],
	orderTotal: { type: Number, default: 0 }
});

orderSchema.pre('remove', async function() {
	await Line.remove({
		_id: {
			$in: this.lines
		}
	});
});

// orderSchema.plugin(autoIncrement.plugin, {
//     model: 'orders',
//     field: 'orderId',
//     startAt: 8000,
//     incrementBy: 1
// });

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('orders', orderSchema);
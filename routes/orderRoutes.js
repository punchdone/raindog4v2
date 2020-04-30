const mongoose = require('mongoose');

const Order = mongoose.model('orders');
const Selection = mongoose.model('selections');
const Finish = mongoose.model('finishes');

module.exports = app => {

    //List orders
    app.get('/api/orders', async (req, res) => {
        const orders = await Order.find()
            .populate('material')
            .populate('construction')
            .populate('interior')
            .populate('drawerbox')
            .populate('hinge')
            .populate('guide')
            .populate('door')
            .populate('topdrawer')
            .populate('finish')
            .populate('lines')
            .exec();
        res.send(orders);
    });

    //Add order
    app.post('/api/orders', async (req, res) => {
        const order = await Order.create(req.body);
        res.send(order);
    });

};

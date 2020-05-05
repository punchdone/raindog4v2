const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const autoIncrement = require('mongoose-auto-increment');

require('./models/Project/Project');
require('./models/Product/Sample');
require('./models/Client/Address');
require('./models/Client/Email');
require('./models/Client/Phone');
require('./models/Project/Room');
require('./models/Order/Order');
require('./models/Product/Product');
require('./models/Product/Selections/Selection');
require('./models/Product/Selections/Attribute');
require('./models/Product/Selections/Finish');

mongoose.connect('mongodb+srv://rw_user:rudy4joy@cluster0-dqmci.mongodb.net/test?retryWrites=true&w=majority');

// autoIncrement.initialize(connection);


const app = express();

app.use(bodyParser.json());

require('./routes/sampleRoutes.js')(app);
require('./routes/projectRoutes.js')(app);
require('./routes/productRoutes.js')(app);
require('./routes/orderRoutes.js')(app);

app.get('/', (req, res) => {
    res.send('I am here!');
});


app.listen(5000, () => 'Server is running on 5000');

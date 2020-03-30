const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Project');
require('./models/Sample');
require('./models/Client/Address');
require('./models/Client/Email');
require('./models/Client/Phone');

mongoose.connect('mongodb+srv://rw_user:wood2good@cluster0-dqmci.mongodb.net/test?retryWrites=true&w=majority');

const app = express();

app.use(bodyParser.json());

require('./routes/sampleRoutes.js')(app);
require('./routes/projectRoutes.js')(app);


app.get('/', (req, res) => {
    res.send('I am here!');
});


app.listen(5000, () => 'Server is running on 5000');

const mongoose = require('mongoose');
const multer = require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });

const Product = mongoose.model('products');
const Selection = mongoose.model('selections');
const Attribute = mongoose.model('attributes');
const Finish = mongoose.model('finishes');


module.exports = app => {

    //List products
    app.get('/api/products', async (req, res) => {
        const products = await Product.find();
        res.send(products);
    });

     //List selections
     app.get('/api/products/selections', async (req, res) => {
        const selections = await Selection.find();
        res.send(selections);
    });

    //Get product details
    app.get('/api/products/:productId', async (req, res) => {
        const product = await Product.findById(req.params.productId);
        res.send(product);
    });

    //Add product
    app.post('/api/products', upload.array('images', 4), async (req, res) => {
        console.log('[POST api/products] req.body = ', req.body);
        console.log('[POST api/products] req.files = ', req.files);
        req.body.images = [];
        console.log('[POST api/products] req.body.images = ', req.body.images);
        for(const file of req.files) {
            req.body.images.push({
                url: file.secure_url,
                public_id: file.public_id
            });
        };
        const product = await Product.create(req.body);
        res.send(product);
    });

    //Remove product
    app.delete('/api/products/:productId', async (req, res) => {
        await Product.findByIdAndDelete(req.params.productId);
        res.send('Deleted Successfully!');
    });

    app.put('/api/products/:productId', async (req, res) => {
        console.log('PUT ', req.params.productId);
        console.log('PUT ', req.body);
        let product = await Product.findByIdAndUpdate(req.params.productId, req.body);
        try {
            await product.save();
        } catch (err) {
            res.status(422).send(err);
        }
        updatedProduct = await Product.findById(product._id);
        res.send(updatedProduct);
    })

    //List selections
    app.get('/api/selections', async (req, res) => {
        const selections = await Selection.find();
        res.send(selections);
    });

   

    //List finish types
    app.get('/api/products/selections/finishTypes', async (req, res) => {
        const finishTypes = await Selection.find({ type: 'finishType'});
        res.send(finishTypes);
    });

    //List materials/wood
    app.get('/api/products/selections/materials', async (req, res) => {
        const materials = await Selection.find({ type: 'wood'});
        res.send(materials);
    })

    //List finishes
    app.get('/api/products/selections/finishes', async (req, res) => {
        const finishes = await Finish.find().populate('finishTypes').populate('materials').exec();
        res.send(finishes);
    });

    //List stocking types
    app.get('/api/products/selections/stocking', async (req, res) => {
        const stocking = await Selection.find({ type: 'stocking' });
        res.send(stocking);
    });

    //Add selection
    app.post('/api/products/selections', async (req, res) => {
        console.log('req.body = ', req.body);
        const selection = await Selection.create(req.body);
        res.send(selection);
    });

    //Add finish
    app.post('/api/products/selections/finishes', async (req, res) => {
        const finish = await Finish.create(req.body);
        res.send(finish);
    });

    //Add material/wood to finish
    app.put('/api/products/selections/finishes/:finishId/materials', async (req, res) => {
        console.log('[PUT new wood on finish] req.body = ', req.body);
        const finish = await Finish.findById(req.params.finishId).exec();
        console.log('[PUT individual wood id for push = ', req.body.materials);
        finish.materials.push(req.body.materials);
        finish.save();
        const material = await Selection.findById(req.body.materials);
        res.send(material);
    });

    //Delete selection
    app.delete('/api/products/selections/:selectionId', async (req, res) => {
        await Selection.findByIdAndDelete(req.params.selectionId);
        res.send('Deleted successfully!');
    });

    //Delete finish
    app.delete('/api/products/selections/finishes/:finishId', async (req, res) => {
        await Finish.findByIdAndDelete(req.params.finishId);
        res.send('Deleted successfully!');
    });

    //Delete finish material selection
    app.delete('/api/products/selections/finishes/:finishId/materials/:materialId', async (req, res) => {
        let finish = await Finish.findById(req.params.finishId);
        finish.materials.pull(req.params.materialId);
        finish.save();
        res.send(finish);
    });

    //Add attribute to a selection
    app.post('/api/products/selections/:selectId/attributes', async (req, res) => {
        let attribute = await Attribute.create(req.body);
        let selection = await (await Selection.findById(req.params.selectinId)).exec();
        selection.attributes.push(attribute._id);
        selection.save();
    })

};
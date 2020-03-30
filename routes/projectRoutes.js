const mongoose = require('mongoose');
// const bodyParser = require('body-parser').json();

const Project = mongoose.model('projects'); 
const Address = mongoose.model('addresses');
const Email = mongoose.model('emails');
const Phone = mongoose.model('phones');

module.exports = app => {

    //Get list of projects
    app.get('/api/projects', async (req, res) => {
        const projects = await Project.find();
        res.send(projects);
    });

    //Get individual client detail
    app.get('/api/projects/:projectId', async (req, res) => {
        const id = req.params.projectId;
        // console.log('[GET /api/clients/:clientId] clientId = ', id);
        const project = await Project.find({ _id: id });
        // console.log('[GET /api/clients/:clientId] client = ', client);
        res.send(project);
    });

    //Create new project
    app.post('/api/projects', async (req, res) => {

        console.log('[POST /api/projects] req.body = ', req.body);
        
        const { name, addresses, phones, emails } = req.body;

        const project = new Project({
            name,
            createdDate: Date.now()
        });

        try {
            await project.save();
            console.log('project saved!');
        } catch (err) {
            res.status(422).send(err);
        }

        await addresses.forEach(async address => {
            let addressResponse = await Address.create(address);
            await project.addresses.push(addressResponse._id);
        });
        await phones.forEach(async phone => {
            let phoneResponse = await Phone.create(phone);
            await project.phones.push(phoneResponse._id);
        })
        await emails.forEach(async email => {
            let emailResponse = await Email.create(email);
            await project.emails.push(emailResponse._id);
        });
        await project.save();
        console.log('project after = ', project);
        res.send(project);
    });

    app.post('/api/projects/addresses', async (req, res) => {
        let address = await Address.create(req.body);
        res.send(address);
    })

    //Update project data
    app.put('/api/projects/:projectId', async (req, res) => {
        // console.log('[PUT /api/clients/:clientId] req.params = ', req.params);
        // console.log('[PUT /api/clients/:clientId] req.body = ', req.body);
        await Project.findByIdAndUpdate(req.params.projectId, req.body);
        // console.log('Updated client successfully!');
    });

    //Delete project
    app.delete('/api/clients/:projectId', async (req, res) => {
        console.log('[DELETE /api/projects/:projectId] req.params = ', req.params);
        const id = req.params.projectId;
        try {
            await Project.findByIdAndRemove(id);
        } catch (err) {
            res.status(422).send(err);
        }
    });

};
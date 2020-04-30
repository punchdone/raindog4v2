const mongoose = require('mongoose');
// const bodyParser = require('body-parser').json();

const Project = mongoose.model('projects'); 
const Address = mongoose.model('addresses');
const Email = mongoose.model('emails');
const Phone = mongoose.model('phones');
const Room = mongoose.model('rooms');

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
        const project = await Project.find({ _id: id })
            .populate('addresses')
            .populate('phones')
            .populate('emails')
            .populate('rooms')
            .exec();
        // console.log('[GET /api/clients/:clientId] client = ', client);
        res.send(project);
    });

    //Create new project
    app.post('/api/projects', async (req, res) => {

        console.log('[POST /api/projects] req.body = ', req.body);
        
        const { name, addresses, phones, emails } = req.body;

        const project = new Project({
            name,
            addresses,
            phones,
            emails,
            createdDate: Date.now()
        });

        try {
            await project.save();
            console.log('project saved!');
        } catch (err) {
            res.status(422).send(err);
        }

        // await addresses.forEach(async address => {
        //     let addressResponse = await Address.create(address);
        //     await project.addresses.push(addressResponse._id);
        // });
        // await phones.forEach(async phone => {
        //     let phoneResponse = await Phone.create(phone);
        //     await project.phones.push(phoneResponse._id);
        // })
        // await emails.forEach(async email => {
        //     let emailResponse = await Email.create(email);
        //     await project.emails.push(emailResponse._id);
        // });
        // await project.save();
        // console.log('project after = ', project);
        // res.send(project);
    });

    app.post('/api/projects/addresses', async (req, res) => {
        let address = await Address.create(req.body);
        res.send(address);
    });

    app.post('/api/projects/phones', async (req, res) => {
        let phone = await Phone.create(req.body);
        res.send(phone);
    });

    app.post('/api/projects/emails', async (req, res) => {
        let email = await Email.create(req.body);
        res.send(email);
    });

    app.post('/api/projects/rooms', async (req, res) => {
        let room = await Room.create(req.body);
        res.send(room);
    });

    //Update project data
    app.put('/api/projects/:projectId', async (req, res) => {
        // console.log('[PUT /api/clients/:clientId] req.params = ', req.params);
        console.log('[PUT /api/clients/:clientId] req.body = ', req.body);
        let project = await Project.findByIdAndUpdate(req.params.projectId, req.body);
        try {
            await project.save();
            console.log('project updated!');
        } catch (err) {
            res.status(422).send(err);
        }
        let updatedProject = await Project.findById(project._id);
        console.log('[PUT /api/projects/:clientId] project = ', updatedProject);
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

    app.delete('/api/projects/:projectId/addresses/:addressId', async (req, res) => {
        let project = await Project.findById(req.params.projectId);
        project.addresses.pull(req.params.addressId);
        project.save();
        await Address.findByIdAndDelete(req.params.addressId);
        res.send(project);
    });

    app.delete('/api/projects/:projectId/phones/:phoneId', async (req, res) => {
        let project = await Project.findById(req.params.projectId);
        project.phones.pull(req.params.phoneId);
        project.save();
        await Phone.findByIdAndDelete(req.params.phoneId);
        res.send(project);
    })

    app.delete('/api/projects/:projectId/emails/:emailId', async (req, res) => {
        console.log('[DELETE email] projectId = ', req.params.projectId);
        console.log('[DELETE email] emailId = ', req.params.emailId);
        let project = await Project.findById(req.params.projectId);
        project.emails.pull(req.params.emailId);
        project.save();
        await Email.findByIdAndDelete(req.params.emailId);
        res.send(project);
    });

    app.delete('/api/projects/:projectId/samples/:sampleId', async (req, res) => {
        // console.log('[DELETE /api/clients/:clientId/samples/:sampleId] req.params = ', req.params);
        const projectId = req.params.projectId;
        console.log('[DELETE sample] projectId = ', projectId);
        const sampleId = req.params.sampleId;
        console.log('DELETE sample] sampleId = ', sampleId);
        let project = await Project.findById(req.params.projectId).populate('samples').exec();
        // console.log('project = ', project);
        // console.log('Before client.samples = ', client.samples);
        project.samples.pull(sampleId);
        // console.log('After client.samples = ', client.samples);
        project.save();
        await Sample.findByIdAndDelete(req.params.sampleId); 
    });

};
const mongoose = require('mongoose');

const Sample = mongoose.model('samples');
const Project = mongoose.model('projects');

module.exports = app => {

    //Get a list of all samples
    app.get('/api/samples', async (req, res) => {
        const samples = await Sample.find();
        res.send(samples);
    });

    //Get list of projects that have sample
    app.get('/api/samples/:sampleId', async (req, res) => {
        const projects = await Project.find({ 'samples': sampleId });
        res.send(projects);
    });

    //Get list of samples by client
    app.get('/api/projects/:projectId/samples', async (req, res) => {
        // console.log('[GET api/clients/:clientId/samples] req.params.clientId = ', req.params.clientId);
        // const client = await Client.find({ _id: req.params.clientId });

        const projectSamples = await Project.find({ _id: req.params.projectId })
            .populate({
                path: 'samples',
                model: 'samples'
            })
            .exec();
        res.send(projectSamples[0].samples);

        // console.log('[GET /api/clients/:clientId/samples] client = ', client);
        // const samples = client[0].samples;
        // console.log('[GET /api/clients/:clientId/samples] samples = ', samples);
        // let sampleDetails = [];
        // await samples.forEach(
        //     async sample => {
        //         let sampleDetail = await Sample.find({ _id: sample });
        //         sampleDetails = await sampleDetails.concat(sampleDetail);
        //         console.log('[GET /api/clients/:clientId/samples] sampleDetail = ', sampleDetail );
        //         console.log('[GET /api/clients/:clientId/samples] sampleDetails 2 = ', sampleDetails );
        //     }
        // );
        // console.log('[GET /api/clients/:clientId/samples] sampleDetails = ', sampleDetails);
        // res.send(sampleDetails);
    });

    //Create a sample for a client
    app.post('/api/projects/:projectId/samples', async (req, res) => {
        console.log('[POST api/projects/:projectId/samples] req.params.projectId = ', req.params.projectId);
        console.log('[POST api/projects/:projectId/samples] req.body = ', req.body);

        let sample = await Sample.create(req.body);
        console.log('[POST /api/clients/:clientId/samples] sample = ', sample);
        let project = await Project.findById(req.params.projectId).exec();
        console.log('[POST api/clients/:clientId/samples] before push client = ', project);
        project.samples.push(sample._id);
        project.save();
        console.log('[POST api/clients/:clientId/samples] after push client = ', project);

        // console.log('[POST api/clients/:clientId/samples] newClient = ', newClient);
    });

    app.delete('/api/projects/:projectId/samples/:sampleId', async (req, res) => {
        // console.log('[DELETE /api/clients/:clientId/samples/:sampleId] req.params = ', req.params);
        const projectId = req.params.projectId;
        console.log('projectId = ', projectId);
        const sampleId = req.params.sampleId;
        console.log('sampleId = ', sampleId);
        let project = await Project.findById(req.params.clientId).populate('samples').exec();
        // console.log('project = ', project);
        // console.log('Before client.samples = ', client.samples);
        project.samples.pull(sampleId);
        // console.log('After client.samples = ', client.samples);
        project.save();
        await Sample.findByIdAndDelete(req.params.sampleId); 
    });

};
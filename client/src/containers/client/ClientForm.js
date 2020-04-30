import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
// import * as actions from '../../store/actions';

import NameItem from '../../components/client/nameItem';
import AddressCard from '../../components/client/address/addressCard';
import PhoneCard from '../../components/client/phone/phoneCard';
import EmailCard from '../../components/client/email/emailCard';

class ClientForm extends Component {

    state = {
        project: {
            addresses: [],
            phones: [],
            emails: []
        },
        newProject: false,
        editName: false,
        showAddress: false,
        showPhone: false,
        showEmail: false
    }
    editNameHandler = this.editNameHandler.bind(this);
    nameChangeHandler = this.nameChangeHandler.bind(this);
    updateNameHandler = this.updateNameHandler.bind(this);
    // handleChange = this.handleChange.bind(this);
    // handleSubmit = this.handleSubmit.bind(this);
    addAddress = this.addAddress.bind(this);
    updateShowAddress = this.updateShowAddress.bind(this);
    removeAddress = this.removeAddress.bind(this);
    addPhone = this.addPhone.bind(this);
    removePhone = this.removePhone.bind(this);
    updateShowPhone = this.updateShowPhone.bind(this);
    addEmail = this.addEmail.bind(this);
    removeEmail = this.removeEmail.bind(this);
    updateShowEmail = this.updateShowEmail.bind(this);
    updateProject = this.updateProject.bind(this);
    submitProject = this.submitProject.bind(this);

    async componentDidMount() {
        const idArr = window.location.pathname.split('/');
        const clientId = idArr[2]; 
        console.log('[componentDidMount] clientId = ', clientId);
        if(window.location.pathname === '/projects/new') {
            this.setState({ newProject: true, editName: true });
        } else {
            const projectDetails = await axios.get('/api/projects/' + clientId);
            this.setState({ project: projectDetails.data[0] });
        }
        console.log('[componentDidMount] this.state.project = ', this.state.project);
    }

    nameChangeHandler(e) {
        e.preventDefault();
        let project = {...this.state.project};
        project.name = e.target.value;
        this.setState({ project });
    }

    editNameHandler() {
        this.setState(prevState => ({ editName: !prevState.editName }));
    }

    updateNameHandler(val) {
        axios.put('/api/projects/'+this.state.project._id, { 'name': val });
        this.setState({ editName: false });
    }

    updateShowAddress() {
        this.setState(prevState => ({ showAddress: !prevState.showAddress }));
    }

    async addAddress(val) {
        const address = await axios.post('/api/projects/addresses', val);
        let project = {...this.state.project};
        project.addresses.push(address.data);
        this.setState({ project, showAddress: false });
    }

    async removeAddress(id) {
        let { addresses } = {...this.state.project};
        // await axios.delete('/api/projects/'+this.state.project._id+'/addresses/'+id);
        let revAddresses = _.remove(addresses, (address) => (address._id === id));
        this.setState({ addresses: revAddresses });
    }

    async addPhone(val) {
        const phone = await axios.post('/api/projects/phones', val);
        let project = {...this.state.project}
        project.phones.push(phone.data);
        this.setState({ project, showPhone: false });
    }

    async removePhone(id) {
        let { phones } = {...this.state.project};
        // await axios.delete('/api/projects/'+this.state.project._id+'/phones/'+id);
        let revPhones = _.remove(phones, (phone) => (phone._id === id));
        this.setState({ phones: revPhones });
    }

    updateShowPhone() {
        this.setState(prevState => ({ showPhone: !prevState.showPhone }));
    }

    async addEmail(val) {
        console.log('[addEmail] val = ', val);
        const email = await axios.post('/api/projects/emails', val);
        console.log('[addEmail] email = ', email);
        let project = {...this.state.project};
        project.emails.push(email.data);
        console.log('[addEmail] project = ', project);
        this.setState({ project, showEmail: false });
    }

    async removeEmail(id) {
        // console.log('[removeEmail] id = ', id);
        let { emails } = {...this.state.project};
        // console.log('[removeEmail] before emails = ', emails);
        // await axios.delete('/api/projects/'+this.state.project._id+'/emails/'+id);
        let revEmails = _.remove(emails, (email) => (email._id === id));
        // console.log('[removeEmail] after emails = ', revEmails)
        this.setState({ emails: revEmails });
        // console.log('[removeEmail] this.state.project.emails = ', this.state.project.emails);
        
    }

    updateShowEmail() {
        this.setState(prevState => ({ showEmail: !prevState.showEmail }));
    }

    updateProject(e) {
        e.preventDefault();
        console.log('[updateProject] this.props.history = ', this.props.history);
        console.log('[updateProject] locatation = ', this.props.location.pathname);
        // const { history } = this.props;
        // let project = {...this.state.project};
        axios.put('/api/projects/' + this.state.project._id, this.state.project);
        this.props.history.push('/projects');
        // this.setState({ redirect: true });
    }

    submitProject() {
        const { history } = this.props;
        console.log('[submitProject] history = ', history);
        let project = {...this.state.project};
        axios.post('/api/projects', project);
        this.props.history.push('/projects');
        //this.setState({ redirect: true });
    }

    // clientSubmitHandler = () => {
    //     let client = this.state.name;
    //     alert('You are trying to submit a new client: ' + client);
    //     axios.post('/api/clients', client)
    //         .then(response => console.log(response))
    //         .catch(error => console.log(error));
    // }

    // inputChangedHandler(event) {
    //     this.setState({name: event.target.value});
    // }

    // handleChange(event) {
    //     this.setState({name: event.target.name});
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     let client = this.state.name;
    //     alert('This is the name: ' + client);
    //     axios.post('/api/projects', this.state)
    //         .then(response => console.log(response))
    //         .catch(error => console.log(error));
    //     this.props.history.push('/');
    // }

    renderButtons() {
        if(!this.state.newProject) {
            return (
                <div>
                    <Link to="/" className="red btn-flat white-text left">Cancel</Link>
                    <button className="green btn-flat white-text right" onClick={this.updateProject}>Update</button>
                </div>
            ) 
        } else {
            return (
                <div>
                    <Link to="/" className="red btn-flat white-text left">Cancel</Link>
                    <button className="green btn-flat white-text right" onClick={() => this.submitProject()}>New Project</button>
                </div>
            )
        }
    };

    render() {
        const {match} = this.props;
        const clientId = match.params.clientId;

        return (
            <div>
                <h3>Client Form</h3>
                <NameItem
                    editOnClick={this.editNameHandler}
                    updateOnClick={this.updateNameHandler}
                    changeHandler={this.nameChangeHandler}
                    edit={this.state.editName}
                    clientId={clientId}
                    name={this.state.project.name}
                 />
                 <AddressCard 
                    addresses={this.state.project.addresses} 
                    addAddress={this.addAddress}
                    removeAddress={this.removeAddress}
                    showAddress={this.state.showAddress}
                    updateShowAddress={this.updateShowAddress}
                 />
                 <PhoneCard 
                    phones={this.state.project.phones}
                    addPhone={this.addPhone}
                    removePhone={this.removePhone}
                    showPhone={this.state.showPhone}
                    updateShowPhone={this.updateShowPhone}
                  />
                  <EmailCard
                    emails={this.state.project.emails}
                    addEmail={this.addEmail}
                    removeEmail={this.removeEmail}
                    showEmail={this.state.showEmail}
                    updateShowEmail={this.updateShowEmail}
                   />
                 {this.renderButtons()}
            </div>
        );
    }
};

ClientForm =  reduxForm({
    form: 'clientForm',
    destroyOnUnmount: false
})(ClientForm);

export default withRouter(ClientForm);

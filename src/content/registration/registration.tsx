import * as React from 'react';
import App from '../../App';
import './registration.css';

import axios, { AxiosResponse } from 'axios';

class Registration extends React.Component<any, any> {

    public state: IRegistrationForm = {
        firstname : '',
        lastname : '',
        email : '',
        empid : '',
        password : '',
        industry : '',
        serviceline : '',
        servicearea : '',
        designation : '',
        location : '',
        mobileno : ''
    }

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData();
        for (const item in this.state) {
            if (item) {
                formData.append(item, this.state[item]);
            }
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const api = App.apis.register;
        try {
            return axios.post(api, formData, config).then((res: AxiosResponse<IRegistrationForm>) => {
                return 'User logged in as ' + res.data.email;
            },
            (error) => {
                console.log(error);
                return error;
            })
        }
        catch(e) {
            return e.message;
        }
    }
    
    public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    public render() {
        return (
            <div className="well col-centered">
                <div className="page-header">
                    <h1>User Registration</h1>
                </div>
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="firstname">Firstname:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="firstname" placeholder="Enter Firstname" name="firstname" value={ this.state.firstname } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="lastname">Lastname:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="lastname" placeholder="Enter Lastname" name="lastname" value={ this.state.lastname } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email:</label>
                        <div className="col-sm-7">
                            <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" value={ this.state.email } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="empid">Employee ID:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="empid" placeholder="Enter Employee ID" name="empid" value={ this.state.empid } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="password">Password:</label>
                        <div className="col-sm-7">
                            <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={ this.state.password } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="industry">Industry:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="industry" placeholder="Enter Industry" name="industry" value={ this.state.industry } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="serviceline">Service Line:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="serviceline" placeholder="Enter Service Line" name="serviceline" value={ this.state.serviceline } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="servicearea">Service Area:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="servicearea" placeholder="Enter Service Area" name="servicearea" value={ this.state.servicearea } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="designation">Designation:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="designation" placeholder="Enter Desgination" name="designation" value={ this.state.designation } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="location">Work Location:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="location" placeholder="Enter Desgination" name="location" value={ this.state.location } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="mobileno">Mobile No:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="mobileno" placeholder="Enter Desgination" name="mobileno" value={ this.state.mobileno } onChange={ this.handleChange } required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-9 col-sm-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Registration;

interface IRegistrationForm {
    'firstname' : string,
    'lastname' : string,
    'email' : string,
    'empid' : string,
    'password' : string,
    'industry' : string,
    'serviceline' : string,
    'servicearea' : string,
    'designation' : string,
    'location' : string,
    'mobileno' : string
}
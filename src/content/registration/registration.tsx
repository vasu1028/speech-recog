import * as React from 'react';

import './registration.css';

class Registration extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(e: any) {
        console.log('Yepee! form submitted');
        e.preventDefault();
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
                            <input type="text" className="form-control" id="firstname" placeholder="Enter Firstname" name="firstname" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="lastname">Lastname:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="lastname" placeholder="Enter Lastname" name="lastname" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email:</label>
                        <div className="col-sm-7">
                            <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="empid">Employee ID:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="empid" placeholder="Enter Employee ID" name="empid" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="pwd">Password:</label>
                        <div className="col-sm-7">
                            <input type="password" className="form-control" id="pwd" placeholder="Enter Password" name="pwd" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="industry">Industry:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="industry" placeholder="Enter Industry" name="industry" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="serviceline">Service Line:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="serviceline" placeholder="Enter Service Line" name="serviceline" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="servicearea">Service Area:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="servicearea" placeholder="Enter Service Area" name="servicearea" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="designation">Designation:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="designation" placeholder="Enter Desgination" name="designation" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="location">Work Location:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="location" placeholder="Enter Desgination" name="location" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="mobileno">Mobile No:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="mobileno" placeholder="Enter Desgination" name="mobileno" required={true} />
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
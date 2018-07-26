import * as React from 'react';

import './login.css';

class Login extends React.Component<any, any> {

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
                    <h1>Login</h1>
                </div>
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="username">Username:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="username" placeholder="Enter Username" name="username" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="pwd">Password:</label>
                        <div className="col-sm-7">
                            <input type="password" className="form-control" id="pwd" placeholder="Enter Password" name="pwd" required={true} />
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

export default Login;
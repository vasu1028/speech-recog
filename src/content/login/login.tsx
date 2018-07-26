import * as React from 'react';
import App from '../../App';
import './login.css';

import axios, { AxiosResponse } from 'axios';

class Login extends React.Component<any, any> {

    public state: ILoginForm = {
        email: '',
        password: ''
    };

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: ''
          };
    }

    public handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const api = App.apis.login;
        try {
            return axios.post(api, formData, config).then((res: AxiosResponse<ILoginForm>) => {
                return 'User logged in as ' + res.data.email;
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

    public validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }

    public render() {
        return (
            <div className="well col-centered">
                <div className="page-header">
                    <h1>Login</h1>
                </div>
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email: </label>
                        <div className="col-sm-7">
                            <input type="text" value={ this.state.email } onChange={ this.handleChange }
                                className="form-control" id="email" placeholder="Enter email" name="email" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="password">Password:</label>
                        <div className="col-sm-7">
                            <input type="password" value={ this.state.password } onChange={ this.handleChange } 
                                className="form-control" id="password" placeholder="Enter Password" name="password" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-9 col-sm-3">
                            <button disabled={ !this.validateForm() } type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;

interface ILoginForm {
    email: string;
    password: string;
}
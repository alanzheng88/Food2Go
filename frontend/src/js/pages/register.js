import React from 'react';
import Validation from 'react-validation';
import axios from "axios";
import * as LoginActions from "../actions/loginActions";
import AlertContainer from 'react-alert';

export default class Register extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
			firstName: "",
		    lastName: "",
		    email: "",
		    password: "",
	    	passwordConfirm: "",
		    role: ""
		  };
		  this.alertOptions = {
			      offset: 14,
			      position: 'top left',
			      time: 2000,
			      transition: 'scale'
		  };
		  // Binding Inputs and Submit button
		  this.onChangeFirstName = this.onChangeFirstName.bind(this);
		  this.onChangeLastName = this.onChangeLastName.bind(this);
		  this.onChangeEmail = this.onChangeEmail.bind(this);
		  this.onChangePassword = this.onChangePassword.bind(this);
		  this.onChangePasswordC = this.onChangePasswordC.bind(this);
		  this.onChangeRole = this.onChangeRole.bind(this);
		  this.onSubmit = this.onSubmit.bind(this);
	}
	
	// Handling onChange events on inputs
	onChangeFirstName(e) {
	    this.setState({ firstName: e.target.value });
	  }
	onChangeLastName(e) {
	    this.setState({ lastName: e.target.value });
	  }
	onChangeEmail(e) {
	    this.setState({ email: e.target.value });
	  }
	onChangePassword(e) {
	    this.setState({ password: e.target.value });
	  }
	onChangePasswordC(e) {
	    this.setState({ passwordConfirm: e.target.value });
	  }
	onChangeRole(e) {
	    this.setState({ role: e.target.value });
	  }
	reset(){
		this.setState({
			firstName: "",
		    lastName: "",
		    email: "",
		    password: "",
	    	passwordConfirm: "",
		    role: ""
		});
	}
	onSubmit(e){
		  var th = this;
		  e.preventDefault();
		  console.log(this.state);
		  var data = {
		    firstName: this.state.firstName.trim(),
		    lastName: this.state.lastName.trim(),
		    email: this.state.email.trim(),
		    password: this.state.password.trim(),
		    role: this.state.role
		  }
		  // Submit form via jQuery/AJAX
		  axios({
		    method: 'POST',
		    url: 'http://localhost:9000/api/users',
		    data: JSON.stringify(data)
		  })
		  .then(function(data) {
			  alert('Account Created!');
			  var loginData = {
			  	email: th.state.email.trim(),
		    	password: th.state.password.trim(),
			  }
			  LoginActions.authenticateUser(loginData);
			  th.reset();
			  th.props.router.push('/');
			  msg.success('Account created!');
		  })
		  .catch(function(error) {
			  msg.error('Failed to register!');
			  if (error.response) {
			  // The request was made, but the server responded with a status code 
			  // that falls out of the range of 2xx 
			  console.log(error.response.data);
			  console.log(error.response.status);
			  console.log(error.response.headers);
			} else {
			  // Something happened in setting up the request that triggered an Error 
			  console.log('Error', error.message);
			}
		  });

		}
	render() {
		return <Validation.components.Form onSubmit={this.onSubmit.bind(this)}>
            <h2>Registration</h2>
            <div class="form-group">
	            <label>
	                First Name*
	                <Validation.components.Input class="form-control" errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.firstName} onChange={this.onChangeFirstName} ref='firstName' name='firstName' validations={['required', 'alpha']}/>
	            </label>
            </div>
            <div class="form-group">
	            <label>
	                Last Name*
	                <Validation.components.Input class="form-control" errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.lastName} onChange={this.onChangeLastName} ref='lastName' name='lastName' validations={['required', 'alpha']}/>
	            </label>
			</div>
            <div class="form-group">
                <label>
                    Email*
                    <Validation.components.Input class="form-control" value={this.state.email} onChange={this.onChangeEmail} ref='email' name='email' validations={['required', 'email']}/>
                </label>
            </div>
            <div class="form-group">
                <label>
                    Password*
                    <Validation.components.Input class="form-control" type='password' value={this.state.password} onChange={this.onChangePassword} ref='password' name='password' validations={['required', 'passwordLength']}/>
                </label>
            </div>
            <div class="form-group">
	            <label>
	                Confirm Password*
	                <Validation.components.Input class="form-control" type='password' onChange={this.onChangePasswordC} errorClassName='is-invalid-input' containerClassName='' value={this.state.passwordConfirm} name='passwordConfirm' validations={['required', 'password']}/>
	            </label>
            </div>
            <div class="form-group">
	            <label>
	                Role*
	                <Validation.components.Select class="form-control" errorClassName='is-invalid-input' onChange={this.onChangeRole} ref='role' name='role' value={this.state.role} validations={['required']}>
	                    <option value=''>Choose Your Account Type</option>
	                    <option value='customer'>Customer</option>
	                    <option value='restaurantOwner'>Restaurant Owner</option>
	                </Validation.components.Select>
	            </label>
            </div>
            <div>
                <Validation.components.Button class="btn btn-default" className='button' errorClassName='asd'>Submit</Validation.components.Button>
            </div>
        </Validation.components.Form>;
    }
}
import React from 'react';
import Validation from 'react-validation';
import axios from "axios";

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
		    url: 'http://localhost:9000/api/user',
		    data: JSON.stringify(data)
		  })
		  .then(function(data) {
			  alert('Account Created!');
			  th.reset();
		  })
		  .catch(function(error) {
			  alert('Failed to Register!');
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
            <h1>Registration</h1>
            <div>
	            <label>
	                First Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.firstName} onChange={this.onChangeFirstName} ref='firstName' name='firstName' validations={['required', 'alpha']}/>
	            </label>
            </div>
            <div>
	            <label>
	                Last Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.lastName} onChange={this.onChangeLastName} ref='lastName' name='lastName' validations={['required', 'alpha']}/>
	            </label>
			</div>
            <div>
                <label>
                    Email*
                    <Validation.components.Input value={this.state.email} onChange={this.onChangeEmail} ref='email' name='email' validations={['required', 'email']}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <Validation.components.Input type='password' value={this.state.password} onChange={this.onChangePassword} ref='password' name='password' validations={['required', 'passwordLength']}/>
                </label>
            </div>
            <div>
	            <label>
	                Confirm Password*
	                <Validation.components.Input type='password' onChange={this.onChangePasswordC} errorClassName='is-invalid-input' containerClassName='' value={this.state.passwordConfirm} name='passwordConfirm' validations={['required', 'password']}/>
	            </label>
            </div>
            <div>
	            <label>
	                Role*
	                <Validation.components.Select errorClassName='is-invalid-input' onChange={this.onChangeRole} ref='role' name='role' value={this.state.role} validations={['required']}>
	                    <option value=''>Choose Your Account Type</option>
	                    <option value='customer'>Customer</option>
	                    <option value='restaurantOwner'>Restaurant Owner</option>
	                </Validation.components.Select>
	            </label>
            </div>
            <div>
                <Validation.components.Button className='button' errorClassName='asd'>Submit</Validation.components.Button>
            </div>
        </Validation.components.Form>;
    }
}
import React from 'react';
import Validation from 'react-validation';
import axios from "axios";

export default class Register extends React.Component {
	constructor(props) {
		  super(props);
		  this.onSubmit = this.onSubmit.bind(this);
	}    
	onSubmit(e){
		  //alert('Account Created!');
		  e.preventDefault();
		  var _this = this;
		  console.log(this.refs);

		  var data = {
			username: this.refs.username.state.value.trim(),
		    firstName: this.refs.firstName.state.value.trim(),
		    lastName: this.refs.lastName.state.value.trim(),
		    email: this.refs.email.state.value.trim(),
		    password: this.refs.password.state.value.trim(),
		    role: this.refs.role.state.value
		  }

		  // Submit form via axios
		  axios({
		    method: 'POST',
		    url: 'http://localhost:9000/api/register',
		    data: JSON.stringify(data)
		  })
		  .then(function(response) {
			alert('Account Created!');  
		    _this.clearForm()
		  })
		  .catch(function(error) {
			alert('Failed to register!');  
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
			console.log(error.config);
		  });

		}
	render() {
		return <Validation.components.Form onSubmit={this.onSubmit.bind(this)}>
            <h1>Registration</h1>
			<div>
                <label>
                    Username*
                    <Validation.components.Input value='' ref='username' name='username' placeholder='Ex. Food2Go' validations={['required']}/>
                </label>
            </div>
            <div>
	            <label>
	                First Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' ref='firstName' name='firstName' placeholder='Ex. John' validations={['required', 'alpha']}/>
	            </label>
            </div>
            <div>
	            <label>
	                Last Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' ref='lastName' name='lastName' placeholder='Ex. Smith'validations={['required', 'alpha']}/>
	            </label>
			</div>
            <div>
                <label>
                    Email*
                    <Validation.components.Input value='' ref='email' name='email' placeholder='Ex. email@email.com' validations={['required', 'email']}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <Validation.components.Input type='password' value='' ref='password' name='password' placeholder='Password' validations={['required']}/>
                </label>
            </div>
            <div>
	            <label>
	                Confirm Password*
	                <Validation.components.Input type='password' errorClassName='is-invalid-input' containerClassName='' value='' name='passwordConfirm' validations={['required', 'password']}/>
	            </label>
            </div>
            <div>
	            <label>
	                Role*
	                <Validation.components.Select errorClassName='is-invalid-input' ref='role' name='role' value='' validations={['required']}>
	                    <option value=''>Choose Your Account Type</option>
	                    <option value='customer'>Customer</option>
	                    <option value='restaurant_owner'>Restaurant Owner</option>
	                </Validation.components.Select>
	            </label>
            </div>
            <div>
                <Validation.components.Button className='button' errorClassName='asd'>Submit</Validation.components.Button>
            </div>
        </Validation.components.Form>;
    }
}
import React from 'react';
import Validation from 'react-validation';
import $ from "jquery";

export default class Register extends React.Component {
	constructor(props) {
		  super(props);
		  this.onSubmit = this.onSubmit.bind(this);
	}    
	onSubmit(e){
		  //alert('Account Created!');
		  e.preventDefault();
		  console.log(this.refs);

		  var data = {
		    firstName: this.refs.firstName.state.value.trim(),
		    lastName: this.refs.lastName.state.value.trim(),
		    email: this.refs.email.state.value.trim(),
		    password: this.refs.password.state.value.trim(),
		    role: this.refs.role.state.value
		  }

		  // Submit form via jQuery/AJAX
		  $.ajax({
		    type: 'POST',
		    url: '/api/register',
		    data: JSON.stringify(data)
		  })
		  .done(function(data) {
		    this.clearForm()
		  })
		  .fail(function(jqXhr) {
		    console.log('failed to register');
		  });

		}
	render() {
		return <Validation.components.Form onSubmit={this.onSubmit.bind(this)}>
            <h3>Registration</h3>
            <div>
	            <label>
	                First Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' ref='firstName' name='firstName' validations={['required', 'alpha']}/>
	            </label>
            </div>
            <div>
	            <label>
	                Last Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' ref='lastName' name='lastName' validations={['required', 'alpha']}/>
	            </label>
			</div>
            <div>
                <label>
                    Email*
                    <Validation.components.Input value='email@email.com' ref='email' name='email' validations={['required', 'email']}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <Validation.components.Input type='password' value='' ref='password' name='password' validations={['required']}/>
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
import React from 'react';
import Validation from 'react-validation';

export default class Register extends React.Component {
	onSubmit = function (e){
		  alert('Account Created!');
		  var self

		  e.preventDefault()
		  self = this

		  console.log(this.state);

		  var data = {
		    firstname: this.state.firstname,
		    lastname: this.state.lastname,
		    email: this.state.email,
		    password: this.state.password,
		    role: this.state.role
		  }

		  // Submit form via jQuery/AJAX
		  $.ajax({
		    type: 'POST',
		    url: '/api/register',
		    data: data
		  })
		  .done(function(data) {
		    self.clearForm()
		  })
		  .fail(function(jqXhr) {
		    console.log('failed to register');
		  });

		}
	render() {
		return <Validation.components.Form onSubmit={this.onSubmit}>
            <h3>Registration</h3>
            <div>
	            <label>
	                First Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' name='firstname' validations={['required', 'alpha']}/>
	            </label>
            </div>
            <div>
	            <label>
	                Last Name*
	                <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' name='lastname' validations={['required', 'alpha']}/>
	            </label>
			</div>
            <div>
                <label>
                    Email*
                    <Validation.components.Input value='email@email.com' name='email' validations={['required', 'email']}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <Validation.components.Input type='password' value='' name='password' validations={['required']}/>
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
	                <Validation.components.Select errorClassName='is-invalid-input' name='role' value='' validations={['required']}>
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
import React from "react";
import Validation from 'react-validation';
import axios from "axios";

export default class Settings extends React.Component {
  constructor(props) {
	  super(props);
	  this.onSubmit = this.onSubmit.bind(this);
	  // Binding Inputs and Submit button
	  this.onChangeFirstName = this.onChangeFirstName.bind(this);
	  this.onChangeLastName = this.onChangeLastName.bind(this);
	  this.onChangeEmail = this.onChangeEmail.bind(this);
	  this.onChangePassword = this.onChangePassword.bind(this);
	  this.onChangePasswordC = this.onChangePasswordC.bind(this);
	  this.onChangeRole = this.onChangeRole.bind(this);
	  this.state = {
				id: 0,
				firstName: "",
				lastName: "",
				email: "",
				role: "customer"
		  };
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
  componentDidMount() {
    var _this = this;
      axios
        .get("http://localhost:9000/api/user/1")
        .then(function(result) {  
			console.log(response);
          _this.setState({
    	  	firstName: response.firstName,
			lastName: response.lastName,
			email: response.email,
			role: response.role});
          })
		.catch(function(error) {
			console.log(error);
		  });
  }
  componentWillUnmount() {
    //this.serverRequest.abort();
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
		    //role: this.state.role
		  }
		  
		  // Submit form via jQuery/AJAX
		  axios({
		    method: 'PUT',
		    url: 'http://localhost:9000/api/user',
		    data: JSON.stringify(data)
		  })
		  .then(function(data) {
			  alert('Successfully edited account!');
			  th.reset();
		  })
		  .catch(function(error) {
			  alert('Failed to edit user!');
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
            <h1>Settings</h1>
				<div>
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
							<Validation.components.Select class="disabled-text" errorClassName='is-invalid-input' ref='role' name='role' value={this.state.role}  validations={['required']} disabled>
								<option value=''>Choose Your Account Type</option>
								<option value='customer'>Customer</option>
								<option value='restaurant_owner'>Restaurant Owner</option>
							</Validation.components.Select>
						</label>
					</div>
				</div>
            <div>
                <Validation.components.Button className='button' errorClassName='asd'>Save Changes</Validation.components.Button>
            </div>
        </Validation.components.Form>;
    }
}

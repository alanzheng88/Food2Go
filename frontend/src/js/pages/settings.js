import React from "react";
import Validation from 'react-validation';
import axios from "axios";
import {Link} from "react-router";
import userStore from "../stores/userStore";

export default class Settings extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
			  	loginStatus: userStore.getLoginStatus(),
				userInfo: userStore.getUserInfo(),
				firstName: "",
				lastName: "",
                email: "",
                password: "",
                passwordConfirm: "",
				role: ""
		  };
	  this.state.firstName = this.state.userInfo.firstName;
	  this.state.lastName = this.state.userInfo.lastName;
	  this.state.email = this.state.userInfo.email;
	  this.state.role = this.state.userInfo.role;
	  this.onSubmit = this.onSubmit.bind(this);
	  // Binding Inputs and Submit button
	  this.onChangeFirstName = this.onChangeFirstName.bind(this);
	  this.onChangeLastName = this.onChangeLastName.bind(this);
	  this.onChangeEmail = this.onChangeEmail.bind(this);
	  this.onChangePassword = this.onChangePassword.bind(this);
	  this.onChangePasswordC = this.onChangePasswordC.bind(this);
	  this.onChangeRole = this.onChangeRole.bind(this);
	  console.log("user", this.state.userInfo);
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
    /*var _this = this;
      axios
        .get("http://localhost:9000/api/user/"+this.state.userInfo.id)
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
		  });*/
  }
  componentWillUnmount() {
    //this.serverRequest.abort();
  }
	onSubmit(e){
		  var th = this;
		  e.preventDefault();
		  console.log(this.state);
		  var data = {
		    firstName:  this.state.firstName.trim(),
            lastName:   this.state.lastName.trim(),
            email:      this.state.userInfo.email,
            password:   this.state.password.trim(),
            role:       this.state.userInfo.role
		  }
          console.log("data", data);
		  // Submit form via jQuery/AJAX
		  axios({
		    method: 'PUT',
		    url: 'http://localhost:9000/api/user',
            data: JSON.stringify(data),
            withCredentials: true
		  })
		  .then(function(response) {
              alert('Successfully edited account!');
              th.props.router.push('/account');
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
		const { userInfo, loginStatus } = this.state;
		let page = null;
		if(loginStatus)
		{
			page= <Validation.components.Form onSubmit={this.onSubmit.bind(this)}>
            <h1>Profile Settings</h1>
				<div>
                    <div class="form-group">
						<label>
							First Name*
							<Validation.components.Input class="form-control" errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.firstName} onChange={this.onChangeFirstName} ref='firstName' name='firstName' validations={['required', 'alpha']}/>
						</label>
					</div>
					<div>
						<label>
							Last Name*
							<Validation.components.Input class="form-control" errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.lastName} onChange={this.onChangeLastName} ref='lastName' name='lastName' validations={['required', 'alpha']}/>
						</label>
					</div>
					<div>
						<label>
							Email*
							<Validation.components.Input class="form-control disabled-text" value={this.state.email} onChange={this.onChangeEmail} ref='email' name='email' validations={['required', 'email']} disabled/>
						</label>
					</div>
					<div>
						<label>
							Password*
							<Validation.components.Input class="form-control" type='password' value={this.state.password} onChange={this.onChangePassword} ref='password' name='password' validations={['required', 'passwordLength']} />
						</label>
					</div>
					<div>
						<label>
							Confirm Password*
							<Validation.components.Input class="form-control" type='password' onChange={this.onChangePasswordC} errorClassName='is-invalid-input' containerClassName='' value={this.state.passwordConfirm} name='passwordConfirm' validations={['required', 'password']} />
						</label>
					</div>
					<div>
						<label>
							Role*
							<Validation.components.Select class="form-control disabled-text" errorClassName='is-invalid-input' ref='role' name='role' value={this.state.role}  validations={['required']} disabled>
								<option value=''>Choose Your Account Type</option>
								<option value='customer'>Customer</option>
								<option value='restaurantOwner'>Restaurant Owner</option>
							</Validation.components.Select>
						</label>
					</div>
				</div>
            <div>
                <Validation.components.Button class="btn btn-default" className='button' errorClassName='asd'>Save Changes</Validation.components.Button>
            </div>
        </Validation.components.Form>;
		} else {
			page = (
					<div>
				      <h1 class="noMatch">You&apos;re not logged in!</h1>
					  <p class="emoji">😕</p>
					  <h3 class="noMatch">You must <Link to={`register`}>register</Link> or <Link to={`login`}>login</Link> to view this page!</h3>
					</div>
				    );
		}
        return(
        	<div>
        	{page}
        	</div>	
        );
    }
}

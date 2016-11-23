import React from "react";
import Validation from 'react-validation';
import axios from "axios";

export default class Settings extends React.Component {
  constructor(props) {
	  super(props);
	  this.onSubmit = this.onSubmit.bind(this);
	  this.state = {
		userData: []
	  };
	}  
  componentDidMount() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("http://localhost:9000/api/user",{
			params: {
				sessionid: abcd1234
			}
		})
        .then(function(result) {  
			console.log(response);
          _this.setState({
            userData: result.data
          })
		.catch(function (error) {
			console.log(error);
		  });
        })
  }
  componentWillUnmount() {
    //this.serverRequest.abort();
  }
  onSubmit(e){
		  e.preventDefault();
		  //Edit user in DB

		}
	render() {
		return <Validation.components.Form onSubmit={this.onSubmit.bind(this)}>
            <h1>Settings</h1>
			{this.state.userData.map(function(userData) {
			return (
				<div>
					<div>
						<label>
							First Name*
							<Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={userData.firstName} ref='firstName' name='firstName' validations={['required', 'alpha']}/>
						</label>
					</div>
					<div>
						<label>
							Last Name*
							<Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={userData.lastName} ref='lastName' name='lastName' validations={['required', 'alpha']}/>
						</label>
					</div>
					<div>
						<label>
							Email*
							<Validation.components.Input value={userData.email} ref='email' name='email' validations={['required', 'email']}/>
						</label>
					</div>
					<div>
						<label>
							Password*
							<Validation.components.Input type={userData.password} value='' ref='password' name='password' validations={['required']}/>
						</label>
					</div>
					<div>
						<label>
							Confirm Password*
							<Validation.components.Input type='' errorClassName='is-invalid-input' containerClassName='' value='' name='passwordConfirm' validations={['required', 'password']}/>
						</label>
					</div>
					<div>
						<label>
							Role*
							<Validation.components.Select errorClassName='is-invalid-input' ref='role' name='role' value={userData.Role} validations={['required']}>
								<option value=''>Choose Your Account Type</option>
								<option value='customer'>Customer</option>
								<option value='restaurant_owner'>Restaurant Owner</option>
							</Validation.components.Select>
						</label>
					</div>
				</div>
			);
			})}
            <div>
                <Validation.components.Button className='button' errorClassName='asd'>Save Changes</Validation.components.Button>
            </div>
        </Validation.components.Form>;
    }
}

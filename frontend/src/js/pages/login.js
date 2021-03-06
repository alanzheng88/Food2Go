import React from "react";

import * as LoginActions from "../actions/loginActions";
import userStore from "../stores/userStore";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      authFailed: false,
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAuthenticationFailure = this.handleAuthenticationFailure.bind(this);
    this.redirect = this.redirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillMount() {
    userStore.on("auth_failure", this.handleAuthenticationFailure);
    userStore.on("login", this.redirect);
  } 

  componentWillUnmount() {
    userStore.removeListener("auth_failure", this.handleAuthenticationFailure);
    userStore.removeListener("login", this.redirect);
  }

  handleAuthenticationFailure () {
    this.setState({authFailed:true});
  }

  redirect() {
    console.log(this.props);
    this.props.router.push('/');
  }

  handleUserNameChange(event) {
    this.setState({userName: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      email:this.state.userName,
      password:this.state.password,
    }
    LoginActions.authenticateUser(data);
  }

  render() {
    return (
      <div className="col-md-4">
      <h2>Login Page</h2>
      {this.state.authFailed &&
        <p style={{color:'red'}}>
          Username and password combination doesn't exist.
        </p>
      }
      <form onSubmit={this.handleSubmit}>
      <div class="form-group">
        <label>Email:</label>
        <input class="form-control" type="text" placeholder="Email address" value={this.state.userName} onChange={this.handleUserNameChange} required />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input class="form-control" type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
        <br/>
      </div>
      <p><a href="#/register">Don't have an account yet?</a></p>
      <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }



  // render() {
  //   console.log("Login");
  //   return (

  //     // <div>
  //     //   <div className="col-md-4">
  //     //     <h4>Login Page</h4>
  //     //     <br />
  //     //     <br />
  //     //     <label><b>UserName</b></label>
  //     //     <input type="text" placeholder="Enter your email" name="username" required />
  //     //     <br />
  //     //     <br />
  //     //     <label><b>Password</b></label>
  //     //     <input type="password" placeholder="Enter password" name="psw" required />
  //     //     <br />
  //     //     <br />
  //     //     <input type="checkbox" defaultchecked="checked" />Remember me 
  //     //     <br />
  //     //     <br />
  //     //     <p><button type="submit">Submit</button></p>
  //     //     <a href="#">Forget password?</a>
  //     //     </div>
  //     // </div>
  //   );
  // }
}

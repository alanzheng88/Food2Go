import React from "react";

import * as LoginActions from "../actions/loginActions";
import userStore from "../stores/userStore";


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : userStore.getUser(),
      userName: '',
      password: '',
      authFailed: false,
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAuthenticationFailure = this.handleAuthenticationFailure.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillMount() {
    userStore.on("failToAuthenticate", this.handleAuthenticationFailure);
  }

  componentWillUnmount() {
    userStore.removeListener("failToAuthenticate", this.handleAuthenticationFailure);
  }

  handleAuthenticationFailure () {
      this.setState({authFailed:true});
  }
  updateUser(){

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
      sessionid:userStore.getGuid(),
      role:'customer'
    }
    LoginActions.authenticaUser(JSON.stringify(data));
    //LoginActions.loginUser(userStore.getGuid());
    //LoginActions.logoutUser(userStore.getGuid());
  }

  render() {
    console.log("Login");
    return (
      <div className="col-md-4">
      <h4>Login Page</h4>
      {this.state.authFailed &&
        <p style={{color:'red'}}>
          Username and password combination doesn't exist.
        </p>
      }
      <form onSubmit={this.handleSubmit}>
        <label><b>UserName:</b></label>
        <input type="text" placeholder="Email address" value={this.state.userName} onChange={this.handleUserNameChange} required />
        <br/>
        <label><b>Password:</b></label>
        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
        <br/>
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

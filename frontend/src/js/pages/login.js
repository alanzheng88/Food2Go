import React from "react";

import * as LoginActions from "../actions/loginActions";
import LoginStore from "../stores/loginStore";


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      ID: this.guid(),
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  componentWillMount() {
    LoginStore.on("change", this.updateUser);
  }

  componentWillUnmount() {
    LoginStore.removeListener("change", this.updateUser);
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
      userName:this.state.userName,
      password:this.state.password,
      ID:this.state.ID,
    }
    LoginActions.loginUser(JSON.stringify(data));
  }

  render() {
    console.log("Login");
    return (
      <div className="col-md-4">
      <h4>Login Page</h4>
      <form onSubmit={this.handleSubmit}>
        <label><b>UserName:</b></label>
        <input type="text" value={this.state.userName} onChange={this.handleUserNameChange} required />
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

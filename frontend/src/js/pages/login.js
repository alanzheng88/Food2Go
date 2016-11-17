import React from "react";

export default class Login extends React.Component {
  render() {
    console.log("Login");
    return (
      <div>
        <div className="col-md-4">
          <h4>Login Page</h4>
          <br />
          <br />
          <label><b>UserName</b></label>
          <input type="text" placeholder="Enter your email" name="username" required />
          <br />
          <br />
          <label><b>Password</b></label>
          <input type="password" placeholder="Enter password" name="psw" required />
          <br />
          <br />
          <input type="checkbox" defaultchecked="checked" />Remember me 
          <br />
          <br />
          <p><button type="submit">Submit</button></p>
          <a href="#">Forget password?</a>
          </div>
      </div>
    );
  }
}

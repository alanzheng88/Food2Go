import React from "react";
import { IndexLink, Link } from "react-router";

export default class UserInfo extends React.Component {
  /*constructor(props) {
	  super(props);
	  this.state = {
		userData: []
	  };
	}  
  componentDidMount() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("http://localhost:9000/user?sessionid=abcd1234")
        .then(function(result) {    
          _this.setState({
            userData: result.data
          });
        })
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }*/
  render() {
    console.log("UserInfo");
    return (
		<div>
		  <h1>Your Account</h1>
			<h3>Orders</h3>
				<Link to="Orders">View All Orders</Link>
			<h3>Points and Coupons</h3>
				<Link to="Points">Your Points</Link>
				<br></br>
				<Link to="Coupons">Your Coupons</Link>
				<br></br>
				<Link to="Points">Invite Friends</Link>
			<h3>Account Settings</h3>
				<Link to="Settings">Profile Settings</Link>
				<br></br>
				<Link to="Settings">Notifications</Link>
		</div>
    );
  }
}

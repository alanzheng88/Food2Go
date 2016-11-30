import React from "react";
import { IndexLink, Link } from "react-router";
import userStore from "../stores/userStore";

export default class UserInfo extends React.Component {
  /*componentDidMount() {
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
	//const { userInfo, loginStatus } = this.state;
	let page = null;
    console.log("UserInfo");
    if(userStore.getLoginStatus()){
		page = (<div>
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
    }else{
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

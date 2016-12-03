import React from "react";
import { IndexLink, Link } from "react-router";
import userStore from "../stores/userStore";

export default class UserInfo extends React.Component {
  render() {
	let page = null;
    console.log("UserInfo");
    if(userStore.getLoginStatus()){
        page = (<div>
            <h1>Your Account</h1>
            <h3>Orders</h3>
				<Link to="/orders">View All Orders</Link>
			<h3>Points and Coupons</h3>
				<Link to="/points">Your Points</Link>
				<br></br>
				<Link to="/coupons">Your Coupons</Link>
				<br></br>
				<Link to="/points">Invite Friends</Link>
			<h3>Account Settings</h3>
				<Link to="/settings">Profile Settings</Link>
				<br></br>
				<Link to="/settings">Notifications</Link>
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

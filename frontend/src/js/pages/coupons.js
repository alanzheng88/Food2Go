import React from "react";
import axios from "axios";
import { IndexLink, Link } from "react-router";
import userStore from "../stores/userStore";

export default class Coupons extends React.Component {
    render() {
        console.log("Coupons");
        let page = null;
        if (userStore.getLoginStatus()) {
            page = (<div class="container">
                <h1 class="row">Your Coupons</h1>
            </div>
            );
        } else {
            page = (
                <div>
                    <h1 class="noMatch">You&apos;re not logged in!</h1>
                    <p class="emoji">😕</p>
                    <h3 class="noMatch">You must <Link to={`register`}>register</Link> or <Link to={`login`}>login</Link> to view this page!</h3>
                </div>
            );
        }
        return (
            <div>
                {page}
            </div>
        );
  }
}

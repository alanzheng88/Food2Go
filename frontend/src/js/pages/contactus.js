import React from "react";
import Mailto from "react-mailto";
export default class ContactUs extends React.Component {
  render() {
    console.log("ContactUs");
    return (
    <div class="row">
    	<h1>Contact Us</h1>
    	<div class="col-md-5">
    		<h4>Join Food2Go</h4>
    		<p>If you want to become one of us, and have html, react.js with babel, play and test experience. Please email us through <Mailto email="gofood2go@gmail.com" obfuscate={true}>gofood2go@gmail.com</Mailto></p>
    	</div>
    	<div class="col-md-2">
    	</div>
    	<div class="col-md-5">
    		<h4>Contact us for specific problem</h4>    	</div>
    </div>
    );
  }
}
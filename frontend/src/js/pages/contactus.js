import React from "react";
import Mailto from "react-mailto";
export default class ContactUs extends React.Component {
  render() {
    console.log("ContactUs");
    return (
    <div class="row">
    	<h1>Contact Us</h1>
    	<div class="col-md-4">
    		<h4>Join Food2Go</h4>
    		<p>If you want to become one of us, and have html, react.js with babel, play and test experience. Please email us through <Mailto email="gofood2go@gmail.com" obfuscate={true}>gofood2go@gmail.com</Mailto> and please mention Join Food2Go in the title of the mail, thank you</p>
    	</div>
    	<div class="col-md-4">
    		<h4>Contact us for specific problem</h4>
            <p>If you want to become one of us, and have html, react.js with babel, play and test experience. Please email us through <Mailto email="gofood2go@gmail.com" obfuscate={true}>gofood2go@gmail.com</Mailto> and please mention Join Food2Go in the title of the mail, thank you</p> 	
        </div>
        <div class="col-md-4">
            <h4>Business support</h4>
            <p>If you do not understand how to use the website and need support, please use <a href="https://www.facebook.com/Food2Go-1659070711051820/">facebook </a> and message us in chat system, we will reply within 5 minutes thank you.</p>
        </div>
    </div>
    );
  }
}
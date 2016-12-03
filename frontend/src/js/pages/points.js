import React from "react";
import Validation from 'react-validation';
import axios from "axios";
import AlertContainer from 'react-alert';

export default class Invite extends React.Component {
	constructor(props) {
		  super(props);
		  this.state = {
				  email: "",
				  points: 0
		  };
		  this.alertOptions = {
			      offset: 14,
			      position: 'top left',
			      time: 2000,
			      transition: 'scale'
		  };
		  // Binding Inputs and Submit button
		  this.onChangeEmail = this.onChangeEmail.bind(this);
		  this.onSubmit = this.onSubmit.bind(this);
	}
	onChangeEmail(e) {
	    this.setState({ email: e.target.value });
	}
	onSubmit(e){
		e.preventDefault();
		msg.success('Email sent!');
	}
	render() {
    console.log("Invite");
    return (
    <div class="container">
      <h1 class="text-center row">Your Food Points</h1>
      <div class="row text-center">
      	<h3>You currently have {this.state.points} Food Points!</h3> 
      	<p>You can gather Food Points by buying food
      	or inviting friends to use Food2Go.</p>
      	<p>You can apply your points during checkout to reduce the
      	cost of your purchase! (100 points = 1&#36;)</p>
      </div>
      <div class="panel row panel-info center-block" style={{maxWidth: 500}}>
        <div class="panel-heading">
          <h3 class="panel-title">Invite a friend!</h3>
        </div>
        <div class="panel-body">
          If you invite a friend to use Food2Go and they register and purchase food, 
          you will obtain 200 Food Points to spend towards your next purchase!
	        <div class="form text-center">
	          <Validation.components.Form onSubmit={this.onSubmit.bind(this)}>
	          <div>
		          <label>
		              Your Friend's Email*
		              <Validation.components.Input value={this.state.email} onChange={this.onChangeEmail} ref='email' name='email' validations={['required', 'email']}/>
		          </label>
	          </div>
	          <div>
	          	<Validation.components.Button className='button' errorClassName='asd'>Send Invite!</Validation.components.Button>
	          </div>
	          </Validation.components.Form>
	        </div>
        </div>
        <div class="panel-footer">Your current Food Points total is {this.state.points}</div>
      </div>
    </div>
    );
  }
}

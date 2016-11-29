import React from 'react';
import Validation from 'react-validation';
import axios from "axios";
import Dropzone from 'react-dropzone';
import {Link} from 'react-router';
import userStore from "../stores/userStore";
import * as LoginActions from "../actions/loginActions";

export default class CreateRestaurant extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
		  	loginStatus: userStore.getLoginStatus(),
			userInfo: userStore.getUserInfo(),
			restaurantName: "",
			restaurantAddress: "",
			restaurantPhoneNumber: "",
			restaurantEmail: "",
			restaurantDescription: "",
	        imageFiles: [],
	        menuFile: []
		  };
		  /*this.updateLoginStatus = this.updateLoginStatus.bind(this);
		  this.updateUserInfo = this.updateUserInfo.bind(this);*/
		  // Binding Inputs and Submit button
		  this.onChangeRestaurantName = this.onChangeRestaurantName.bind(this);
		  this.onChangeRestaurantAddress = this.onChangeRestaurantAddress.bind(this);
		  this.onChangeRestaurantEmail = this.onChangeRestaurantEmail.bind(this);
		  this.onChangeRestaurantDescription = this.onChangeRestaurantDescription.bind(this);
		  this.onChangeRestaurantPhoneNumber = this.onChangeRestaurantPhoneNumber.bind(this);
		  this.onImageDrop = this.onImageDrop.bind(this);
		  this.onMenuDrop = this.onMenuDrop.bind(this);
		  this.onSubmit = this.onSubmit.bind(this);
	}

	// Handling onChange events on inputs
	onChangeRestaurantName(e) {
	    this.setState({ restaurantName: e.target.value });
	  }
	onChangeRestaurantAddress(e) {
	    this.setState({ restaurantAddress: e.target.value });
	  }
	onChangeRestaurantEmail(e) {
	    this.setState({ restaurantEmail: e.target.value });
	  }
	onChangeRestaurantDescription(e) {
	    this.setState({ restaurantDescription: e.target.value });
	  }
	onChangeRestaurantPhoneNumber(e) {
	    this.setState({ restaurantPhoneNumber: e.target.value });
	  }
	onImageDrop(acceptedFiles) {
	      this.setState({
	        imageFiles: acceptedFiles
	      });
	    }
	onMenuDrop(acceptedFiles) {
	      this.setState({
	        menuFile: acceptedFiles
	      });
	    }
	reset(){
		this.setState({
			restaurantName: "",
		    restaurantAddress: "",
		    restaurantPhoneNumber: "",
		    restaurantEmail: "",
		    restaurantDescription: "",
		    imageFiles: [],
	        menuFile: []
		});
	}
	onSubmit(e){
		  var th = this;
		  e.preventDefault();
		  var data = {
			name: this.state.restaurantName.trim(),
			phoneNumber: this.state.restaurantPhoneNumber.trim(),
			email: this.state.restaurantEmail.trim(),
		    address: this.state.restaurantAddress.trim(),
		    description: this.state.restaurantDescription.trim()
		  }
		  console.log(data);
		  // Submit form via jQuery/AJAX
		  axios({
		    method: 'POST',
		    url: 'http://localhost:9000/api/restaurants',
		    data: JSON.stringify(data),
		    withCredentials: true
		  })
		  .then(function(data) {
			  alert('Restaurant Created!');
			  th.reset();
		  })
		  .catch(function(error) {
			  alert('Failed to create restaurant!');
			  if (error.response) {
			  // The request was made, but the server responded with a status code
			  // that falls out of the range of 2xx
			  console.log(error.response.data);
			  console.log(error.response.status);
			  console.log(error.response.headers);
			} else {
			  // Something happened in setting up the request that triggered an Error
			  console.log('Error', error.message);
			}
		  });

		}
	/*componentWillMount() {
	    userStore.on("auth_success", this.updateLoginStatus);
	    userStore.on("update_userinfo", this.updateUserInfo);
	  }
	componentWillUnmount() {
	    userStore.removeListener("auth_success", this.updateLoginStatus);
	    userStore.removeListener("update_userinfo", this.updateUserInfo);
	  }
	updateUserInfo(userInfo) {
	    this.setState({userInfo: userInfo});
	  }

	  updateLoginStatus(loginStatus) {
	    this.setState({loginStatus: loginStatus});
	    if(loginStatus) {
	      LoginActions.getUserInfo();
	    }
	  }*/
	render() {
		const { userInfo, loginStatus } = this.state;
		let page = null;		
		if(userInfo.role === 'restaurantOwner' && loginStatus)
		{
			page = <Validation.components.Form onSubmit={this.onSubmit.bind(this)}>
            <h1>Create Restaurant</h1>
            <div class="form-group">
	            <label>
	                Restaurant Name*
	                <Validation.components.Input class="form-control" errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.restaurantName} onChange={this.onChangeRestaurantName} ref='restaurantName' name='restaurantName' validations={['required']}/>
	            </label>
            </div>
            <div class="form-group">
	            <label>
	                Restaurant Address*
	                <Validation.components.Input class="form-control" errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.restaurantAddress} onChange={this.onChangeRestaurantAddress} ref='restaurantAddress' name='restaurantAddress' validations={['required']}/>
	            </label>
			</div>
			<div class="form-group">
	            <label>
	                Restaurant Phone Number*
	                <Validation.components.Input class="form-control" errorClassName='is-invalid-input' type='text' value={this.state.restaurantPhoneNumber} onChange={this.onChangeRestaurantPhoneNumber} ref='restaurantPhoneNumber' name='restaurantPhoneNUmber' validations={['required', 'phoneNumber']}/>
	            </label>
            </div>
            <div class="form-group">
                <label>
                    Restaurant Email*
                    <Validation.components.Input class="form-control" errorClassName='is-invalid-input' type='email' value={this.state.restaurantEmail} onChange={this.onChangeRestaurantEmail} ref='restaurantEmail' name='restaurantEmail' validations={['required', 'email']}/>
                </label>
            </div>
            <div class="form-group">
                <label>
                    Restaurant Description*
                    <Validation.components.Textarea class="form-control" errorClassName='is-invalid-input' value={this.state.restaurantDescription} onChange={this.onChangeRestaurantDescription} ref='restaurantDescription' name='restaurantDescription' validations={['required']}/>
                </label>
            </div>
            <div class="form-group">
            	Restaurant Images (Optional)
	            <Dropzone onDrop={this.onImageDrop} accept="image/png,image/jpeg" ref={this.state.imageFiles}>
	              <div>Try dropping some files here, or click to select files to upload. Only .jpg and .png files!</div>
	            </Dropzone>
	            {this.state.imageFiles.length > 0 ? <div>
	            <div class='preview'>{this.state.imageFiles.map((file) =>
	            <div class='responsive'>
		            <div class='img'>
		            	<img src={file.preview} />
		            	<div class='desc'>{file.name}</div>
		            </div>
	            </div>)}</div>
	            </div> : null}
            </div>
            <div class="form-group">
            	Restaurant Menu (Optional) [Only .pdf]
	            <Dropzone onDrop={this.onMenuDrop} accept="application/pdf" multiple={false} ref={this.state.MenuFile}>
	              <div>Try dropping some files here, or click to select files to upload. Only a single .pdf file</div>
	            </Dropzone>
            </div>
            <div>
                <Validation.components.Button class="btn btn-default" className='button' errorClassName='asd'>Submit</Validation.components.Button>
            </div>
        </Validation.components.Form>;
		}else if(loginStatus){
			page= (
					<div>
				      <h1 class="noMatch">You&apos;re not a restaurant owner!</h1>
					  <p class="emoji">😕</p>
					  <h3 class="noMatch">If you want to create a restaurant you must <Link to={`register`}>register</Link> as a restaurant owner.</h3>
					</div>
				    );
		}else{
			page = (
					<div>
				      <h1 class="noMatch">You&apos;re not logged in!</h1>
					  <p class="emoji">😕</p>
					  <h3 class="noMatch">If you want to create a restaurant you must <Link to={`register`}>register</Link> or <Link to={`login`}>login</Link> as a restaurant owner.</h3>
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

import React from "react";
import Slider from "react-slick";
import Collapse from "react-collapse";
import axios from "axios";
import NumberFormat from 'react-number-format';

export default class Restaurant extends React.Component {
	constructor(props) {
	  super(props);
	  let restaurantId = this.props.params.restaurantId;
	  // Default values
	  this.state ={
		restaurantId: {restaurantId},
		restaurantName: "Restaurant Name",
		restaurantAddress: "Restaurant Address",
		restaurantPhoneNumber: "Restaurant Phone Number",
		restaurantEmail: "Restaurant Email",
		restaurantDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar nibh quis ex sodales, a placerat risus aliquam. Pellentesque vitae sapien non sem suscipit tincidunt ut non orci. Integer eget sodales augue. Cras tincidunt aliquam rhoncus. Phasellus dapibus purus id ex eleifend consequat. Cras suscipit, nunc sit amet luctus scelerisque, dui risus aliquet massa, in commodo eros felis a sapien. Mauris faucibus, arcu finibus dapibus semper, est lectus finibus justo, ac ornare velit enim a enim. Praesent non mi turpis. Etiam dictum placerat nisi eu fermentum. Donec luctus fermentum ligula a viverra. Donec mollis turpis ac efficitur vehicula. Suspendisse id risus ex. Proin aliquet eros sed fermentum imperdiet. ",
        imageFiles: [],
        menuFile: [],
        isOpened: false
	  };
	  this.getRestaurantInfo(this.props.params.restaurantId);
	  console.log(this.state);
	}
	getRestaurantInfo(id){
	// Get restaurant info via Axios
		var th = this;
		console.log("id", id);
		axios.get('http://localhost:9000/api/restaurant/'+id)
		  .then(function(response) {
			  console.log(response);
			  th.setState({
					restaurantName: response.data.name,
					restaurantAddress: response.data.address,
					restaurantPhoneNumber: response.data.phoneNumber,
					restaurantEmail: response.data.email,
					restaurantDescription: response.data.description,
			        imageFiles: [],
			        menuFile: []
				  });
		  })
		  .catch(function(error) {
			  console.log('Failed to get restaurant info!');
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
	render() {
	    console.log("Restaurant");
	    const settings = {
		    dots: true,
		    autoplay: true,
		    adaptiveHeight: true,
		    arrows: true,
		    dotsClass: 'slick-dots slick-thumb',
		    infinite: true,
		    speed: 1000,
		    slidesToShow: 1,
		    slidesToScroll: 1
		  };
	    return (
	    <div class='mySlick' id="container">
		    <div class="container">
		      <h1 class="row col-md-12">{this.state.restaurantName}</h1>
		      <div class="row">
				   <div class="col-md-6">
				      <Slider {...settings}>
					      <div>
					      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/49c/e4060076403dee3ff9a71611456bb49c_1472062521.JPG" />
					      </div>
					      <div>
					      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/13e/77244f043c397962c3fa536e6e36313e_1472062525.JPG"/>
					      </div>
					      <div>
					      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/4e2/958b6249cc3eedd75ed6d930b29004e2_1472062526.JPG"/>
					      </div>
				      </Slider>
				    </div>
				    <div class="col-md-6">
				    	<br></br>
				    	<br></br>
				    	<button type="button" class="btn btn-primary btn-lg btn-block">Browse Menu</button>
				    	<button type="button" class="btn btn-danger btn-lg btn-block">Order Now!</button>
				    	<h4>Contact Information</h4>
				    	<p><NumberFormat value={this.state.restaurantPhoneNumber} displayType={'text'} format="(###) ###-####" /></p>
				    	<p>{this.state.restaurantEmail}</p>
				    	<p>{this.state.restaurantAddress}</p>
				    </div>
			    </div>
			    	<h3 class="row">Restaurant Description</h3>
			    	<div class="row">
			    		<p>{this.state.restaurantDescription}</p>
				    	{/*<span class="clickable caret center-block" onClick={ () => {this.setState({isOpened: !this.state.isOpened}); console.log("click",this.state.isOpened)}}/>
				    		<Collapse isOpened={this.state.isOpened} keepCollapsedContent={true}>
				    		<p>{this.state.restaurantDescription}</p>
				    	</Collapse>*/}
			    	</div>
		    </div>
		    </div>
	    );
  }
}

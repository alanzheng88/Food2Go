import React from "react";
import Slider from "react-slick";
import Collapse from "react-collapse";
import axios from "axios";


import { IndexLink, Link } from "react-router";

export default class Food2Go extends React.Component {
	constructor(props) {
	  super(props);
	  let restaurantId = this.props.params.restaurantId;
	  // Default values
	  this.state ={
		restaurantId: {restaurantId},
		restaurantName: "Restaurant Name",
		restaurantDescription: "Restaurant description",
        imageFiles: [],
        menuFile: [],
        isOpened: false
	  };
	  this.getRestaurantInfo(this.props.params.restaurantId);
	  console.log(this.state);
	}
	toggleCollapse() {
    	const collapsed = !this.state.collapsed;
    	this.setState({collapsed});
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
					estaurantDescription: response.data.description,
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
	    console.log("Food2Go");
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
		  const restaurantPic={
		  	dots:true,
		  	autoplay:false,
		  	adaptiveHeight:true,
		  	arrows:true,
		  	dotsClass:'slick-dots slick-thumb',
		  	infinite: true,
		  	slidesToShow:10,
		  	SlidestoScroll:5
		  };
		  const foodPic={
		  	dots:true,
		  	autoplay:false,
		  	adaptiveHeight:true,
		  	arrows:true,
		  	dotsClass:'slick-dots slick-thumb',
		  	infinite: true,
		  	slidesToShow:10,
		  	SlidestoScroll:5
		  };

	    return (
	    <div class='mySlick' id="container">
		    <div class="row">
		      <h1>{this.state.restaurantName}</h1>
			    <div class="col-md-8">
			      <Slider {...settings}>
				      <div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/49c/e4060076403dee3ff9a71611456bb49c_1472062521.JPG" />
				      	<p>{this.state.restaurantDescription}</p>
				      </div>
				      <div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/13e/77244f043c397962c3fa536e6e36313e_1472062525.JPG"/>
				      	<p>{this.state.restaurantDescription}</p>
				      </div>
				      <div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/4e2/958b6249cc3eedd75ed6d930b29004e2_1472062526.JPG"/>
				      	<p>{this.state.restaurantDescription}</p>
				      </div>
			      </Slider>
			    </div>
			    <div class="col-md-1">
			    </div>
			    <div class="col-md-4">
			    	<br></br>
			    	<br></br>
			    	<br />
			    	<div class="button-click-in-main">
			    	<button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.toggleCollapse.bind(this)} >
			    	<Link to="ShoppingCart" onClick={this.toggleCollapse.bind(this)}>Order Now!</Link></button>
			    	<button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.toggleCollapse.bind(this)} >
			    	<Link to="Restaurants" onClick={this.toggleCollapse.bind(this)}>Browse Restaurants</Link></button>
			    	<button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.toggleCollapse.bind(this)} >
			    	<Link to="Foods" onClick={this.toggleCollapse.bind(this)}>Browse Food</Link></button>
			    	</div>
			    </div>
			    <h5>Popular Restaurants pictures</h5>
			    <div class="col-md-11">
			    	<Slider {...restaurantPic}>
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
			    <h5>Popular foods pictures</h5>
			    <div class="col-md-11">
			    	<Slider {...foodPic}>
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
		    </div>
		    </div>
	    );
  }
}

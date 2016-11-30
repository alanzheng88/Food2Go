import React from "react";
import Slider from "react-slick";
import Collapse from "react-collapse";
import axios from "axios";


import { IndexLink, Link } from "react-router";

export default class Food2Go extends React.Component {
	constructor(props) {
	  super(props);
	  // Default values not correct need to find for all restaurant not restaurant id
	  this.state ={
			restaurants: [{
				id: 0,
				name: "Restaurant 1",
				address: "Restaurant Address",
				description: "Restaurant Description"
			},{
				id: 1,
				name: "Restaurant 2",
				address: "Restaurant Address",
				description: "Restaurant Description"
			}]
	  };
	  this.getRestaurants();
	  console.log(this.state);
	}
	toggleCollapse() {
    	const collapsed = !this.state.collapsed;
    	this.setState({collapsed});
  	}
	getRestaurants(){
	// Get restaurant info via Axios
		var th = this;
		axios.get('http://localhost:9000/api/restaurants')
		  .then(function(response) {
			  console.log(response);
			  th.setState({
					restaurants: response.data
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
	    //first picture setting
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
		  //popular restaurant picture slider setting
		  const restaurantPic={
		  	dots:true,
		  	autoplay:false,
		  	adaptiveHeight:true,
		  	arrows:true,
		  	dotsClass:'slick-dots slick-thumb',
		  	infinite: true,
		  	slidesToShow:6,
		  	SlidestoScroll:1
		  };
		  //popular food picture slider setting
		  const foodPic={
		  	dots:false,
		  	autoplay:false,
		  	adaptiveHeight:true,
		  	arrows:true,
		  	dotsClass:'slick-dots slick-thumb',
		  	infinite: false,
		  	slidesToShow:9,
		  	SlidestoScroll:1
		  };

	    return (
	    <div class='mySlick' id="container">
		    <div class="row">
		      <h2>Welcome to Food2Go</h2>
		      <br></br>
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
			      <br></br>
			    </div>
			    <div class="col-md-4">
			    	<br></br>
			    	<br></br>
			    	<br />
			    	<div class="button-click-in-main">
			    	<Link to="Restaurants" class="btn btn-default btn-lg btn-block" onClick={this.toggleCollapse.bind(this)}>Browse Restaurants</Link>
			    	<Link to="Foods" class="btn btn-default btn-lg btn-block" onClick={this.toggleCollapse.bind(this)}>Browse Food</Link>
			    	<Link to="ShoppingCart" class="btn btn-default btn-lg btn-block" onClick={this.toggleCollapse.bind(this)}>Order Now!</Link>
			    	</div>
			    </div>
			    <div class="col-md-11">
			    	<h4>Popular Restaurants pictures</h4>
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
			    
			    <div class="col-md-11">
			    	<h4>Popular foods pictures</h4>
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
				      	<div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/49c/e4060076403dee3ff9a71611456bb49c_1472062521.JPG" />
				      	</div>
				      	<div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/13e/77244f043c397962c3fa536e6e36313e_1472062525.JPG"/>
				      	</div>
				      	<div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/4e2/958b6249cc3eedd75ed6d930b29004e2_1472062526.JPG"/>
				      	</div>
				      	<div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/49c/e4060076403dee3ff9a71611456bb49c_1472062521.JPG" />
				      	</div>
				      	<div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/13e/77244f043c397962c3fa536e6e36313e_1472062525.JPG"/>
				      	</div>
				      	<div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/4e2/958b6249cc3eedd75ed6d930b29004e2_1472062526.JPG"/>
				      	</div>
				      	<div>
				      	<img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/13e/77244f043c397962c3fa536e6e36313e_1472062525.JPG"/>
				      	</div>
			      </Slider>

			    </div>
		    </div>
		    </div>
	    );
  }
}

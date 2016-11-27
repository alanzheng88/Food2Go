import React from "react";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";
const KEYS_TO_FILTERS = ['name', 'address', 'description'];
export default class Restaurants extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
		    searchTerm: "",
				restaurants: [{
					id: 0,
					name: "Restaurant 1",
					address: "Restaurant Address",
					description: "Restaurant Description"},{
						id: 1,
						name: "Restaurant 2",
						address: "Restaurant Address",
						description: "Restaurant Description"}]
		  };
		  this.getRestaurants();
		  this.searchUpdated = this.searchUpdated.bind(this);
	}
	searchUpdated (term) {
	    this.setState({searchTerm: term})
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
	const filteredRestaurants = this.state.restaurants.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    console.log("Restaurants");
    return (
		<div>
      <h1>Search Restaurants</h1>
      <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
      {filteredRestaurants.map(restaurant => {
       return (
	   //<a href={"#/restaurant/"+restaurant.id} className="button">
		<div class="clickableDiv panel panel-default row" onClick={()=>{this.props.router.push("restaurant/"+restaurant.id);}} key={restaurant.id} >
			<div class="panel-heading">
				<h4 class="panel-title">{restaurant.name}</h4>
			</div>
			<div class="panel-body">
				<div class="col-md-4">
	    			<img height="200" width="200" class="rounded img-thumbnail img-fluid" src="http://1.bp.blogspot.com/_v5GFE8gXk5g/TQ-Katq9Y3I/AAAAAAAAAOs/t-XZaZuyU3k/s1600/IMG_6388.JPG"/>
				</div>
				<address class="col-md-4">
					<p>{restaurant.address}</p>
				</address>
				<div class="col-md-4">
					<p>{restaurant.description}</p>
				</div>
			</div>
        </div>
        //</a>
        )
      })} </div>
    );
  }
}

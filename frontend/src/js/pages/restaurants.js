import React from "react";
import SearchInput, {createFilter} from 'react-search-input';

export default class Restaurants extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
		    searchTerm: "",
				restaurants: [{
					id: 0,
					name: "Restaurant Name",
					address: "Restaurant Address",
					description: "Resautarant Description"}]
		  };
		  this.searchUpdated = this.searchUpdated.bind(this);
	}
	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}
	getRestaurants(){
	// Get restaurant info via Axios
		var th = this;
		console.log("id", id);
		axios.get('http://localhost:9000/api/restaurant/')
		  .then(function(response) {
			  console.log(response);
			  th.setState({
					restaurants: th.data
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
    console.log("Restaurants");
    return (
		<div>
      <h1>Search Restaurants</h1>
      <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
      {this.state.restaurants.map(restaurant => {
       return (
				<div key={restaurant.id} class="restaurant row" >
					<div class=".col-md-4">
        		<h4>{restaurant.name}</h4>
          	<img class="img-responsive" src="http://thecatapi.com/api/images/get?format=src&type=jpg"/>
					</div>
					<div class=".col-md-4">
						<p>{restaurant.address}</p>
					</div>
					<div class=".col-md-4">
						<p>{restaurant.description}</p>
					</div>
        </div>
        )
      })} </div>
    );
  }
}

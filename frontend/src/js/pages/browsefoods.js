import React from "react";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";
import Checkbox from 'react-checkbox';

const KEYS_TO_FILTERS = ['name', 'price', 'description'];
export default class BrowseFoods extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
		    searchTerm: "",
				foods: [{
					id: 1,
					name: "food 1",
					price: "10",
					description: "Food Description",
					restaurant: ""},{
						id: 2,
						name: "food 2",
						price: "8",
						description: "Food Description",
						restaurant: ""},{
						id: 3,
						name: "food 3",
						price: "4",
						description: "Food Description",
						restaurant: ""},{
						id: 4,
						name: "food 4",
						price: "15",
						description: "Food Description",
						restaurant: ""},{
						id: 5,
						name: "food 5",
						price: "7",
						description: "Food Description",
						restaurant: ""
						}]
		  };
		  this.getFoods();
		  this.searchUpdated = this.searchUpdated.bind(this);
	}
	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}
	getFoods(){
	// Get all food info via Axios
		var th = this;	
		axios.get('http://localhost:9000/api/foods')
		.then(function(response) {
			  console.log(response);
			  th.setState({
					foods: response.data
				  });
		})
	    .catch(function(error) {
			  console.log('Failed to get food info!');
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
	console.log(this.props);
	//var pathName = this.props.location.pathname;
	const filteredFoods = this.state.foods.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    console.log("BrowseFoods");
    return (
		<div>
      <h1>Search Foods</h1>
      <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
      {filteredFoods.map(food => {
       return (
	   //<a href={"#/food/"+food.id} className="button">
		<div class="clickableDiv panel-default col-md-2" onClick={()=>{this.props.router.push(`restaurants/${food.restaurant.id}/foods/${food.id}`)}} key={food.id}>
			<div class="col-md-12">
	    		<img height="200" width="200" class="rounded img-thumbnail img-fluid" src="http://1.bp.blogspot.com/_v5GFE8gXk5g/TQ-Katq9Y3I/AAAAAAAAAOs/t-XZaZuyU3k/s1600/IMG_6388.JPG"/>
				<h4>{food.name}</h4>
				<h5>${food.price}</h5>
				<h5>From restaurant: <br />{food.restaurant.name}</h5>
			</div>
			<p>&nbsp;</p>
        </div>

        //</a>
        )
      })} </div>
    );
  }
}

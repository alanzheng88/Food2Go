import React from "react";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";
import * as ShoppingCartActions from "../actions/shoppingCartActions";

const KEYS_TO_FILTERS = ['name', 'price', 'description'];
export default class Foods extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
		    searchTerm: "",
				foods: [],
		  };
		  this.getFoods();
		  this.searchUpdated = this.searchUpdated.bind(this);
		  this.addToCart = this.addToCart.bind(this);
	}
	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}
	getFoods(){
	// Get food info via Axios
		var th = this;
		var pathName = th.props.location.pathname;
		console.log(this.props);
		console.log(pathName);		
		axios.get(`http://localhost:9000/api${pathName}`)
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
	addToCart(event) {
      	ShoppingCartActions.addFoodToCart(Number(event.target.value));      
    }
	render() {
	console.log(this.props);
	var pathName = this.props.location.pathname;
	// var restaurantName = this.state.foods.restaurant.name;
	const filteredFoods = this.state.foods.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    console.log("Foods");

    return (
		<div>
      <h1>Menu</h1>
      <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
      {filteredFoods.map(food => {
       return (
	   //<a href={"#/food/"+food.id} className="button">
		<div class="panel-default col-md-3" key={food.id}>
			<div class="col-md-12">
	    		<img height="200" width="200" class="rounded img-thumbnail img-fluid" src="http://1.bp.blogspot.com/_v5GFE8gXk5g/TQ-Katq9Y3I/AAAAAAAAAOs/t-XZaZuyU3k/s1600/IMG_6388.JPG"/>
	    		<div class="col-md-8">
	    			<h4>{food.name}</h4>
	    		</div>
				<div class="col-md-3"><h5>${food.price}</h5> </div>
				<div class="col-md-6">
				<button type="button" class="btn btn-success btn-sm" onClick={()=>{this.props.router.push(`restaurants/${food.restaurant.id}/foods/${food.id}`);}}>View Detail</button>
				</div>
				<div class="col-md-6">
				<button type="button" class="btn btn-success btn-sm" value={`${food.id}`} onClick={this.addToCart}>Add item</button>
				</div>
			</div>
        </div>

        //</a>
        )
      })} </div>
    );
  }
}

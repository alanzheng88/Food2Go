import React from "react";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";

const KEYS_TO_FILTERS = ['name', 'foodType', 'ingredient'];

export default class OrderNow extends React.Component {
/*	constructor(props){
		super(props);
		this.state={
			seachTerm:"",
				foods:[{
				}]
		}
	}*/
	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}
	getFoods(){
	// Get foods info via Axios
		var th = this;
		axios.get('http://localhost:9000/api/restaurant/'+id +'/Foods')
		.then(function(response) {
			console.log(response);
			th.setState({
					foods: response.data
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
			} 
			else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
			}
		});
	}
	render() {
	const filterdFoods = this.state.foods.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    console.log("OrderNow");
    return (
    	<div>
    		<h1>Food List of selected Restaurant</h1>

    	</div>
    );
  }
}

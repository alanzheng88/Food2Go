import React from "react";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";

const KEYS_TO_FILTERS = ['name', 'foodType', 'ingredient'];

export default class OrderNow extends React.Component {
	constructor(props){
		super(props);
		this.state={
			seachTerm:"",
			foods:[{
				foodId:1,
				foodName:"pasta",
				foodPrice:"10",
				foodSalePrice:"5",
				foodDescription:"food description"},{
				foodId:2,
				foodName:"California Roll",
				foodPrice:"9",
				foodSalePrice:"NULL",
				foodDescription:"food description"}]
		};
		//this.getFoods();
		//this.searchUpdated=this.searchUpdated.bind(this);		
	}
	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}
	/*getFoods(){
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
	}*/
	render() {
	const filterdFoods = this.state.foods.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    console.log("OrderNow");
    return (
    	<div>
    		<h1>Food List of selected Restaurant</h1>
    		<SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
      		{filteredFoods.map(food => {
       		return (
	   		//<a href={"#/restaurant/"+restaurant.id} className="button">
			<div class="clickableDiv panel panel-default row" onClick={()=>{this.props.router.push("restaurants/"+id+"/ordernow/"+food.id);}} key={food.id} >
				<div class="panel-heading">
					<h4 class="panel-title">{food.name}</h4>
				</div>
				<div class="panel-body">
					<div class="col-md-4">
	    				<img height="200" width="200" class="rounded img-thumbnail img-fluid" src="http://1.bp.blogspot.com/_v5GFE8gXk5g/TQ-Katq9Y3I/AAAAAAAAAOs/t-XZaZuyU3k/s1600/IMG_6388.JPG"/>
					</div>
					<div class="col-md-6">
						<p>{food.price}</p>
						<p>{food.salePrice}</p>
						<p>{food.description}</p>
					</div>
				</div>
        	</div>
        	//</a>
        	)
      		})}
    	</div>
    );
  }
}

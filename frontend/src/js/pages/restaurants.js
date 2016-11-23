import React from "react";
import SearchInput, {createFilter} from 'react-search-input'

export default class Restaurants extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
		    searchTerm: ""
		  };
		  this.searchUpdated = this.searchUpdated.bind(this);
	}
	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}
	render() {
    console.log("Restaurants");
    return (
    <div>
      <h1>Search Restaurants</h1>
      	<SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
  	</div>
//      {restaurants.map(restaurant => {
//       return (
//        	<div className="image" key={restaurant.image}>
//            <div className="name" key={restaurant.image}>
//            <div className="address">{restaurant.name}</div>
//          </div>
//        )
//      })}
    );
  }
}

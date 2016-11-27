import React from "react";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";
const KEYS_TO_FILTERS = ['date'];

export default class Orders extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
			  searchTerm: "",
			  selectedYear: "",
				orders: [{
					id: 0,
					restaurant: "Koto",
					total: "$9.99",
					date: "2016-12-06",
					status: "Picked up"},{
						id: 1,
						restaurant: "Koto",
						total: "$30.45",
						date: "2016-11-11",
						status: "Delivered"}]
		  };
		  this.getOrders();
		  this.searchUpdated = this.searchUpdated.bind(this);
	}
	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}
	changeYear (e) {
	    this.setState({selectedYear: e.target.value})
	}
	getOrders(){
		// Get order info via Axios
			var th = this;
			axios.get('http://localhost:9000/api/orders')
			  .then(function(response) {
				  console.log(response);
				  th.setState({
						orders: response.data
					  });
			  })
			  .catch(function(error) {
				  console.log('Failed to get order info!');
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
    console.log("Orders");
    const filteredOrders = this.state.orders.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
	<div class="container">
		<h1 class="row text-center">Your Orders</h1>
		Year:&nbsp; 
		<SearchInput className="hidden search-input" onChange={this.searchUpdated.bind(this)} value={this.state.selectedYear} />
		<select onChange={this.changeYear.bind(this)} value={this.state.selectedYear}>
			<option value="2016">2016</option>
			<option value="2015">2015</option>
		</select>
		<table class="table table-hover">
			<thead>
		      <tr>
		        <th class="col-md-1">Order #</th>
		        <th class="col-md-3">Restaurant</th>
		        <th class="col-md-2">Total</th>
		        <th class="col-md-4">Date</th>
		        <th class="col-md-2">Status</th>
		      </tr>
		    </thead>
		    <tbody>
		    {filteredOrders.map(order => {
		        return (
		    	<tr class="clickable" onClick={()=>{this.props.router.push('/order/'+order.id);}} key={order.id}>
		    		<td>{order.id}</td>
		    		<td>{order.restaurant}</td>
		    		<td>{order.total}</td>
		    		<td>{order.date}</td>
		    		<td>{order.status}</td>
		    	</tr>
		    )})}
		    </tbody>
		</table>
	</div>
    );
  }
}

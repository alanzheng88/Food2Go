import React from "react";
import { Link } from "react-router";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";
const KEYS_TO_FILTERS = ['date'];
import userStore from "../stores/userStore";

export default class Orders extends React.Component {
	constructor(props) {
		  super(props);
		  this.state ={
			  searchTerm: "",
			  selectedYear: "",
				orders: [],
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
            axios({
                method: 'GET',
                url: 'http://localhost:9000/api/user/orders',
                withCredentials: true
            })
			  .then(function(response) {
				  console.log("response",response);
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
	orderStatus(status){
		var orderStatus
		if (status == -1) {
	    	orderStatus = <td>Order Cancelled</td>;
		} else if (status == 0) {
			orderStatus =  <td>Order Created</td>
	    } else if (status == 1) {
	    	orderStatus =  <td>Order Processing</td>
	    } else if (status == 2) {
	    	orderStatus =  <td>Payment Processing</td>
	    } else if (status == 3) {
	    	orderStatus =  <td>Delivery</td>
	    } else if (status == 4) {
	    	orderStatus =  <td>Delivered</td>
	    } else if (status == 5) {
	    	orderStatus =  <td>Pick Up Ready</td>
	    } else if (status == 6) {
	    	orderStatus =  <td>Picked Up</td>
	    }
		return orderStatus
	}
  render() {
    console.log("Orders");
    const filteredOrders = this.state.orders.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    let page = null;
    console.log("UserInfo");
    if (userStore.getLoginStatus()) {
        page = (<div class="container">
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
                        <th class="col-md-2">Total</th>
                        <th class="col-md-4">Date Created</th>
                        <th class="col-md-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => {
                        return (
                            <tr class="clickable" onClick={() => { this.props.router.push('/orders/' + order.id); } } key={order.id}>
                                <td>{order.id}</td>
                                <td>${order.totalCost}</td>
                                <td>{order.dateCreated}</td>
                                {this.orderStatus(order.status)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        );
    } else {
        page = (
            <div>
                <h1 class="noMatch">You&apos;re not logged in!</h1>
                <p class="emoji">😕</p>
                <h3 class="noMatch">You must <Link to={`register`}>register</Link> or <Link to={`login`}>login</Link> to view this page!</h3>
            </div>
        );
    }
    return (
        <div>
            {page}
        </div>
    );
  }
}

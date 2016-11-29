import React from "react";
import axios from "axios";

export default class Orders extends React.Component {
	constructor(props) {
		  super(props);
		  let orderId = this.props.params.orderId;
		  this.state ={
				  	id: orderId,
					restaurant: "Koto",
					total: "$9.99",
					date: "2016-12-06",
					status: 6
		  };
		  //this.getOrder(orderId);
	}
	getOrder(id){
		// Get order info via Axios
			var th = this;
			axios.get('http://localhost:9000/api/order/'+id)
			  .then(function(response) {
				  console.log(response);
				  th.setState({
						order: response.data
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
	    	orderStatus = <td>
		    	Order Cancelled
		    	<br/>
		    	<small>You have succesfully cancelled your order.</small>
	    	</td>
		} else if (status == 0) {
			orderStatus =  <td>
			Order Created
			<br/>
	    	<small>You have created your order.</small>
		</td>
	    } else if (status == 1) {
	    	orderStatus =  <td>
			Order Processing
			<br/>
	    	<small>Your order is being processed.</small>
		</td>
	    } else if (status == 2) {
	    	orderStatus =  <td>
			Payment Processing
			<br/>
	    	<small>Your payment is being processed.</small>
		</td>;
	    } else if (status == 3) {
	    	orderStatus =  <td>
			Delivery
			<br/>
	    	<small>Your order is being delivered.</small>
		</td>
	    } else if (status == 4) {
	    	orderStatus =  <td>
			Delivered
			<br/>
	    	<small>Your order has been succesfully delivered.</small>
		</td>
	    } else if (status == 5) {
	    	orderStatus =  <td>
			Pick Up Ready
			<br/>
	    	<small>Your order is ready for pickup.</small>
		</td>
	    } else if (status == 6) {
	    	orderStatus =  <td>
			Picked Up
			<br/>
	    	<small>Your order has been picked up.</small>
		</td>
	    }
		return orderStatus
	}
  render() {
    console.log("Order");
    var date = new Date(this.state.date);
    var monthNames = [
    	  "January", "February", "March",
    	  "April", "May", "June", "July",
    	  "August", "September", "October",
    	  "November", "December"
    	];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return (
	<div class="container">
		<h1 class="row text-center">Order Details</h1>
		<div class="col-md-2">Order #{this.state.id}</div>
		<div class="col-md-3">Ordered on {monthNames[monthIndex] + ' ' + day + ', ' + year}</div>
		<br/>
		<div class="panel panel-default">
		  <div class="panel-body">
		    <h4>Ordered from</h4>
		    <div>{this.state.restaurant}</div>
		    <h4>Order Total</h4>
		    <div>{this.state.total}</div>
		  </div>
		</div>
		<div class="panel panel-default">
		  <div class="panel-body">
		  	<h4>Order Status</h4>
		  		<div>{this.orderStatus(this.state.status)}</div>
		    <h4>Order Items</h4>
		    <div class="row">
			    <div class="col-md-3">Salmon Sashimi(5 pcs) x 1</div>
			    <div class="col-md-1">$9.99</div>
		    </div>
		    <div class="row">
		    <div class="col-md-3">Coupon applied:&nbsp;</div>
		    	<div class="col-md-1">None</div>
		    </div>
		    <h4 class="row col-md-12">Grand Total</h4>
		    	<div class="row col-md-12">{this.state.total}</div>
		  </div>
		</div>
	</div>
    );
  }
}

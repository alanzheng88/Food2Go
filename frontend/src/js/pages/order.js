import React from "react";
import axios from "axios";
import { IndexLink, Link } from "react-router";
import userStore from "../stores/userStore";

export default class Orders extends React.Component {
	constructor(props) {
		  super(props);
		  let orderId = this.props.params.orderId;
          this.state = {
              id: orderId,
              dateCreated: "",
              totalCost: "",
              status: 0,
              address: "",
              foods: []
          };
		  this.getOrder(orderId);
	}
    getOrder(id) {
        // Get order info via Axios
        var th = this;
        axios({
            method: 'GET',
            url: 'http://localhost:9000/api/user/orders/' + id,
            withCredentials: true
            })
			.then(function(response) {
				console.log(response);
                th.setState({
                    dateCreated:    response.data.dateCreated,
                    totalCost:      response.data.totalCost,
                    status:         response.data.status,
                    address:        response.data.destinationAddress,
                    foods:          response.data.foods        
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
	    	orderStatus = <div>
		    	Order Cancelled
		    	<br/>
		    	<small>You have succesfully cancelled your order.</small>
	    	</div>
		} else if (status == 0) {
			orderStatus =  <div>
			Order Created
			<br/>
	    	<small>You have created your order.</small>
		</div>
	    } else if (status == 1) {
	    	orderStatus =  <div>
			Order Processing
			<br/>
	    	<small>Your order is being processed.</small>
		</div>
	    } else if (status == 2) {
	    	orderStatus =  <div>
			Payment Processing
			<br/>
	    	<small>Your payment is being processed.</small>
		</div>;
	    } else if (status == 3) {
	    	orderStatus =  <div>
			Delivery
			<br/>
	    	<small>Your order is being delivered.</small>
		</div>
	    } else if (status == 4) {
	    	orderStatus =  <div>
			Delivered
			<br/>
	    	<small>Your order has been succesfully delivered.</small>
		</div>
	    } else if (status == 5) {
	    	orderStatus =  <div>
			Pick Up Ready
			<br/>
	    	<small>Your order is ready for pickup.</small>
		</div>
	    } else if (status == 6) {
	    	orderStatus =  <div>
			Picked Up
			<br/>
	    	<small>Your order has been picked up.</small>
		</div>
	    }
		return orderStatus
	}
    render() {
        let page = null;
        console.log("Order");
        console.log("state", this.state);
        var date = new Date(this.state.dateCreated);
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        if (userStore.getLoginStatus()) {
            page = (<div class="container">
                <div class="panel-group">
                <h1 class="row text-center">Order Details</h1>
                <div class="col-md-2">Order #{this.state.id}</div>
                <div class="col-md-3">Ordered on {monthNames[monthIndex] + ' ' + day + ', ' + year}</div>
                <br />
                    <div class="panel panel-default row">
                        <div class="panel-body">
                            <h4>Order Total</h4>
                            <div>${this.state.totalCost}</div>
                        </div>
                    </div>
                    <div class="panel panel-default row">                        
                        <div class="panel-body">
                            <h4>Delivery address</h4>
                            <div>{this.state.address}</div>
                        </div>
                    </div>
                    <div class="panel panel-default row">
                        <div class="panel-body">
                            <div class="row col-md-12">
                                <h4>Order Status</h4>
                                {this.orderStatus(this.state.status)}
                            <hr />
                            </div>
                            <div class="row col-md-12">
                            <h4>Order Items</h4>
                            {this.state.foods.map(food => {
                                return (
                                    //<a href={"#/restaurant/"+restaurant.id} className="button">
                                    <div class="clickableDiv" onClick={() => { this.props.router.push("/restaurants/"+ food.restaurant.id +"/foods/" + food.id); } } key={food.id} >
                                        <p class="row col-md-12">{food.name}</p>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <img height="100" width="100" class="rounded img-thumbnail img-fluid" src="http://1.bp.blogspot.com/_v5GFE8gXk5g/TQ-Katq9Y3I/AAAAAAAAAOs/t-XZaZuyU3k/s1600/IMG_6388.JPG" />
                                            </div>
                                            <div class="col-md-10">
                                                <p>${food.price}</p>
                                                <p>Description: {food.description}</p>
                                                <p>Ordered from: {food.restaurant.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })}
                            <hr/>
                            </div>
                            <h4 class="row text-right col-md-12">Grand Total</h4>
                            <div class="row text-right col-md-12">${this.state.totalCost}</div>
                        </div>
                    </div>
                </div>
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

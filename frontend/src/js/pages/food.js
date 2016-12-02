import React from "react";
import Slider from "react-slick";
import Collapse from "react-collapse";
import axios from "axios";
import { IndexLink, Link } from "react-router";
import NumberFormat from 'react-number-format';
import Pager from 'react-pager';
import * as ShoppingCartActions from "../actions/shoppingCartActions";

export default class Food extends React.Component {
    constructor(props) {
      super(props);
      let foodId = this.props.params.foodId;
      // Default values
      this.state ={
        foodId: {foodId},
        foodName: "Food Name",
        foodPrice: "Food Price",
        foodSalePrice: "Food Sale Price",
        foodDescription: "t. Cras suscipit, nunc sit amet luctus scelerisque, dui risus aliquet massa, in commodo eros felis a sapien. Mauris faucibus, arcu finibus dapibus semper, est lectus finibus justo, ac ornare velit enim a enim. Praesent non mi turpis. Etiam dictum placerat nisi eu fermentum. Donec luctus fermentum ligula a viverra. Donec mollis turpis ac efficitur vehicula. Suspendisse id risus ex. Proin aliquet eros sed fermentum imperdiet. ",
        imageFiles: [],
        menuFile: [],
        isOpened: false
      };
      this.getFoodInfo(this.props.params.foodId);
      this.addToCart = this.addToCart.bind(this);
      this.goBack = this.goBack.bind(this);
      console.log(this.state);
    }

    getFoodInfo(id){
    // Get food info via Axios
        var th = this;
        var pathName = th.props.location.pathname;
        console.log("id", id);
        axios.get(`http://localhost:9000/api${pathName}`)
          .then(function(response) {
              console.log(response);
              th.setState({
                    foodName: response.data.name,
                    foodPrice: response.data.price,
                    foodSalePrice: response.data.saleprice,
                    foodDescription: response.data.description,
                    imageFiles: [],
                    menuFile: []
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

    addToCart() {
      ShoppingCartActions.addFoodToCart(this.state.foodId.foodId);      
    }

    goBack() {
      this.props.router.push(`restaurants/${this.props.router.params.restaurantId}/foods`);
    }

    render() {
        console.log("Food");
        const {foodId} = this.state.foodId;
        const wellStyles={maxWidth:400, margin:'0 auto 10px'};
        //console.log("!!!", foodId);
        //const orderNow = `restaurantss/${RestaurantId}/foods`
        return (
        <div class='mySlick' id="container">
            <div class="container">
                <h1 class="row col-md-12">{this.state.foodName}</h1>
                <div class="row">
                    <div class="col-md-5">
                          <img class="img-responsive" src="https://b.zmtcdn.com/data/reviews_photos/49c/e4060076403dee3ff9a71611456bb49c_1472062521.JPG" />
                    </div>
                    <div class="col-md-7">
                        <h4>Food Information</h4>
                        <p>Food Name: {this.state.foodName}</p>
                        <p>Food Price: {this.state.foodPrice}</p>
                        <p>Food Sale Price: {this.state.foodSalePrice}</p>
                        <p>Food Description: {this.state.foodDescription}</p>
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div class="row" style={wellStyles}>
                    <br></br>
                    <button class="btn btn-primary btn-lg btn-block" onClick={this.addToCart}>Select this item to shoppingCart</button>
                    <button class="btn btn-primary btn-lg btn-block" onClick={this.goBack}>Back to our menu</button>
                </div>
            </div>
        </div>
        );
  }
}

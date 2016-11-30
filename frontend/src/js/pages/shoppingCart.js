import React from "react";
import { IndexLink, Link } from "react-router";
import * as ShoppingCartActions from "../actions/shoppingCartActions";
import ShoppingCartStore from "../stores/shoppingCartStore";
import ShoppingItem from "../components/shoppingCart/shoppingItem";

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super()
    
    this.state = {
      foodIdList : ShoppingCartStore.getFoodIds(),
      foodList : [],
    };
    if(this.state.foodIdList !== undefined && this.state.foodIdList.length > 0) {
      ShoppingCartActions.getFoodList(this.state.foodIdList.toString());  
    }
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.updateFoodList = this.updateFoodList.bind(this);
  }

  componentWillMount() {
    ShoppingCartStore.on("updateFoodList", this.updateFoodList);
    ShoppingCartStore.on("updateFoodList_error", this.updateFoodList);
  }

  componentWillUnmount() {
    ShoppingCartStore.removeListener("updateFoodList", this.updateFoodList);
    ShoppingCartStore.removeListener("updateFoodList_error", this.updateFoodList);
  }

  updateFoodList(foodList) {
    this.setState({ foodList: foodList });
  }

  handleCheckout() {
    ShoppingCartStore.setFoodInfo(this.state.foodList);
  }

  handleAmountChange(event,arrayNum) {
    if (event.target.value >= 0) {
      var list = this.state.foodList;
      list[arrayNum].amount = event.target.value;  
      list[arrayNum].totalPrice = Number((event.target.value*list[arrayNum].originalPrice).toFixed(2));
      this.setState({foodList: list})
    }
  }

  handleRemove(event, foodId) {
    ShoppingCartActions.removeFoodInCart(foodId);
    var infoList = this.state.foodList;
    var idList = this.state.foodIdList;
    infoList = infoList.filter(function(item) { return item.foodId !== foodId });
    idList = idList.filter(function(item) { return item.foodId !== foodId });
    this.setState({
        foodList: infoList,
        foodIdList: idList,
      }
    )
  }

  render() {
    const { foodList } = this.state;
    var indents = [];
    var subTotal = 0.00;
    for (var i = 0; i < foodList.length; i++) {
      var foodItem = foodList[i];
      indents.push(<ShoppingItem arrayNum={i} food={foodItem} key={foodItem.foodId} 
        onClick={this.handleRemove} onChange={this.handleAmountChange}/>);
      subTotal += foodItem.totalPrice;
    }
    subTotal = subTotal.toFixed(2);
    var tax = (Number(subTotal)*0.1).toFixed(2); 
    var total = (Number(subTotal)+Number(tax)).toFixed(2);
    return (
      <div className="container">
      <h1>My Shopping Cart</h1>
        <div className="row">
          <div className="col-sm-12 col-md-10 col-md-offset-1">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {indents}
                {foodList.length === 0 && <tr>
                    <td className="col-sm-8 col-md-6"> &nbsp; </td>
                    <td className="col-sm-1 col-md-1" style={{textAlign: 'center'}}> &nbsp; </td>
                    <td className="col-sm-1 col-md-1 text-center"> &nbsp; </td>
                    <td className="col-sm-1 col-md-1 text-center"> &nbsp; </td>
                    <td className="col-sm-1 col-md-1"> &nbsp; </td>                  
                  </tr>
                }
                <tr>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td><h5>Subtotal</h5></td>
                  <td className="text-right"><h5><strong>${subTotal}</strong></h5></td>
                </tr>
                <tr>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td><h5>Tax</h5></td>
                  <td className="text-right"><h5><strong>${tax}</strong></h5></td>
                </tr>
                <tr>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td><h3>Total</h3></td>
                  <td className="text-right"><h3><strong>${total}</strong></h3></td>
                </tr>
                <tr>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  {foodList.length === 0 && 
                    <td>
                      <Link to="/" className="btn btn-default"> Continue Shopping <span className="glyphicon glyphicon-shopping-cart" /></Link>
                    </td>
                  }
                  {foodList.length === 0 && 
                    <td>
                      <Link className="btn btn-success" disabled> Checkout <span className="glyphicon glyphicon-play" /></Link>
                    </td>
                  }
                  {foodList.length !== 0 && 
                    <td> &nbsp; </td>
                  }
                  {foodList.length !== 0 && 
                    <td>
                      <Link to="Checkout" className="btn btn-success" onClick={this.handleCheckout}> Checkout <span className="glyphicon glyphicon-play" /></Link>
                    </td>
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

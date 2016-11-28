import React from "react";
import * as ShoppingCartActions from "../actions/loginActions";
import ShoppingCartStore from "../stores/userStore";
import ShoppingItem from "../components/shoppingCart/shoppingItem";

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super()
    this.state = {
      foodList : [{
        name: 'Pasta',
        foodId: '1',
        resturantId: 'abc',
        restaurantName: 'Pasta factory',
        originalPrice: 12.23,
        totalPrice: 12.23,
        status: 'In stock',
        amount: 1,
        img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png',
      },{
        name: 'Pasta2',
        foodId: '2',
        resturantId: 'bcd',
        restaurantName: 'Pasta factory2',
        originalPrice: 15.34,
        totalPrice: 15.34,
        status: 'In stock',
        amount: 1,
        img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png',
      }]
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
    var list = this.state.foodList;    
    list = list.filter(function(item) { return item.foodId !== foodId });
    this.setState({foodList: list})    
  }

  render() {
    const { foodList } = this.state;
    console.log("Shopping Cart", {foodList});
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
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>                  
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
                  <td> &nbsp; </td>
                  {foodList.length === 0 && 
                    <td> &nbsp; </td>
                  }
                  {foodList.length !== 0 && 
                    <td>
                      <button type="button" className="btn btn-success">
                        Checkout <span className="glyphicon glyphicon-play" />
                      </button>
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

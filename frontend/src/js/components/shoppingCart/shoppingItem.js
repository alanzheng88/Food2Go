import React from "react";
import { IndexLink, Link } from "react-router";
import DynamicNumber from 'react-dynamic-number';
  
export default class ShoppingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    console.log("!!!",this.props.food.amount);
    this.state = {
      amount:this.props.food.amount,
    }
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleAmountChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event,this.props.arrayNum);
    }
    this.setState({ amount: this.props.food.amount});
  }

  handleRemove(event) {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.food.id);
    }
  }
  render() {
    const { food } = this.props;
    const restaurantLink = `#/restaurants/${food.restaurant.id}`;
    const foodLink = `#/restaurants/${food.restaurant.id}/foods/${food.id}`;
    const {amount} = this.state;
    return (
        <tr>
          <td className="col-sm-8 col-md-6">
            <div className="media">
              <a className="thumbnail pull-left" href={foodLink}> 
                <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: 72, height: 72}} /> 
              </a>
              <div className="media-body">
                <h4 className="media-heading">
                  <a href={foodLink}>{food.name}</a>
                </h4>
                <h5 className="media-heading"> 
                    <a href={restaurantLink}>{food.restaurant.name}</a>
                </h5>
              </div>
            </div>
          </td>
          <td className="col-sm-1 col-md-1" style={{textAlign: 'center'}}>
            <DynamicNumber className="form-control" id="num" negative={false} value={amount} onChange={this.handleAmountChange}/>
          </td>
          <td className="col-sm-1 col-md-1 text-center">
            <strong>${food.price}</strong>
          </td>
          <td className="col-sm-1 col-md-1 text-center">
            <strong>${food.totalPrice}</strong>
          </td>
          <td className="col-sm-1 col-md-1">
            <button type="button" className="btn btn-danger" onClick={this.handleRemove}>
              <span className="glyphicon glyphicon-remove" /> Remove
            </button>
          </td>
        </tr>
    );
  }
}

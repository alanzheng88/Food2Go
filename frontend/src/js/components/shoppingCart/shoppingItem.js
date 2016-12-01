import React from "react";
import { IndexLink, Link } from "react-router";
import DynamicNumber from 'react-dynamic-number';
  
export default class ShoppingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    // this.updateLoginStatus = this.updateLoginStatus.bind(this);
  }

  handleAmountChange(event) {
    // console.log(this.props);
    if (this.props.onChange) {
      this.props.onChange(event,this.props.arrayNum);
    }
  }

  handleRemove(event) {
    // console.log(this.props);
    if (this.props.onClick) {
      this.props.onClick(event, this.props.food.foodId);
    }
  }
  render() {
    const { food } = this.props;
    return (
        <tr>
          <td className="col-sm-8 col-md-6">
            <div className="media">
              <a className="thumbnail pull-left" href="#"> 
                <img className="media-object" src={food.img} style={{width: 72, height: 72}} /> 
              </a>
              <div className="media-body">
                <h4 className="media-heading">
                  <a href="#">{food.name}</a>
                </h4>
                <h5 className="media-heading"> 
                  by <a href="#">{food.restaurantName}</a>
                </h5>
                  <span>Status: </span>
                    <span className="text-success"> 
                      <strong>{food.status}</strong>
                    </span>
              </div>
            </div>
          </td>
          <td className="col-sm-1 col-md-1" style={{textAlign: 'center'}}>
            <DynamicNumber className="form-control" id="num" negative={false} value={food.amount} onChange={this.handleAmountChange}/>
          </td>
          <td className="col-sm-1 col-md-1 text-center">
            <strong>${food.originalPrice}</strong>
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

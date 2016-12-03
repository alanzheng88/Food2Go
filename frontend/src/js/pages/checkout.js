import React from "react";
import { IndexLink, Link } from "react-router";
import * as ShoppingCartActions from "../actions/shoppingCartActions";
import ShoppingCartStore from "../stores/shoppingCartStore";
import userStore from "../stores/userStore";


export default class Checkout extends React.Component {
  constructor(props) {
    super()
    this.state = {
      foodList : ShoppingCartStore.getFoodInfo(),
      userInfo: userStore.getUserInfo(),
      paymentInfo : {
        cardType:'',
        cardHolder: '',
        cardNum: '',
        cvv: '',
        expire_month: '',
        expire_year: '',
      }
    };
    this.state.userInfo.address = '';
    this.state.userInfo.city = '';
    this.state.userInfo.province = '';
    this.state.userInfo.zipCode = '';
    this.state.userInfo.phoneNumber = '';
    var subTotal = 0.00;
    for (var i = 0; i < this.state.foodList.length; i++) {
      var foodItem = this.state.foodList[i];
      subTotal += foodItem.totalPrice;
    }
    subTotal = subTotal.toFixed(2);
    var tax = (Number(subTotal)*0.1).toFixed(2); 
    var total = (Number(subTotal)+Number(tax)).toFixed(2);
    this.state.priceInfo = {
      subtotal: subTotal,
      tax: tax,
      total: total,
    }
    this.updateFoodList = this.updateFoodList.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.hadnleCardTypeChange = this.hadnleCardTypeChange.bind(this);
    this.handleCardHolderChange = this.handleCardHolderChange.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCVVChange = this.handleCVVChange.bind(this);
    this.handleExpireMonthChange = this.handleExpireMonthChange.bind(this);
    this.handleExpireYearChange = this.handleExpireYearChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);

  }

  componentWillMount() {
    ShoppingCartStore.on("updateFoodList", this.updateFoodList);
    ShoppingCartStore.on("checkout_success", this.redirect);
    ShoppingCartStore.on("updateFoodList_error", this.updateFoodList);
  }

  componentWillUnmount() {
    ShoppingCartStore.removeListener("updateFoodList", this.updateFoodList);
    ShoppingCartStore.removeListener("checkout_success", this.redirect);
    ShoppingCartStore.removeListener("updateFoodList_error", this.updateFoodList);
  }

  handleFirstNameChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.firstName = event.target.value;
    this.setState({ userInfo: userInfo });
  }

  handleLastNameChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.lastName = event.target.value;
    this.setState({ userInfo: userInfo });
  }

  handleAddressChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.address = event.target.value;
    this.setState({ userInfo: userInfo });
  }

  handleCityChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.city = event.target.value;
    this.setState({ userInfo: userInfo });
  }

  handleProvinceChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.province = event.target.value;
    this.setState({ userInfo: userInfo });
  }

  handleZipCodeChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.zipCode = event.target.value;
    this.setState({ userInfo: userInfo });
  }  

  handlePhoneNumberChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.phoneNumber = event.target.value;
    this.setState({ userInfo: userInfo });
  }

  handleEmailChange(event) {
    var userInfo = this.state.userInfo;
    userInfo.email = event.target.value;
    this.setState({ userInfo: userInfo });
  }  

  hadnleCardTypeChange(event) {
    var paymentInfo = this.state.paymentInfo;
    paymentInfo.cardType = event.target.value;
    this.setState({ paymentInfo: paymentInfo });
  }

  handleCardHolderChange(event) {
    var paymentInfo = this.state.paymentInfo;
    paymentInfo.cardHolder = event.target.value;
    this.setState({ paymentInfo: paymentInfo });
  }

  handleCardNumberChange(event) {
    var paymentInfo = this.state.paymentInfo;
    paymentInfo.cardNum = event.target.value;
    this.setState({ paymentInfo: paymentInfo });
  }  

  handleCVVChange(event) {
    var paymentInfo = this.state.paymentInfo;
    paymentInfo.cvv = event.target.value;
    this.setState({ paymentInfo: paymentInfo });
  }

  handleExpireMonthChange(event) {
    var paymentInfo = this.state.paymentInfo;
    paymentInfo.expireMonth = event.target.value;
    this.setState({ paymentInfo: paymentInfo });
  } 

  handleExpireYearChange(event) {
    var paymentInfo = this.state.paymentInfo;
    paymentInfo.expireYear = event.target.value;
    this.setState({ paymentInfo: paymentInfo });
  }

  updateFoodList(foodList) {
    this.setState({ foodList: foodList });
  }

  redirect() {
    this.props.router.push('/Orders');
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      userInfo: this.state.userInfo,
      priceInfo: this.state.priceInfo,
      paymentInfo: this.state.paymentInfo,
    }
    ShoppingCartActions.checkout(data);
  }
  render() {
    console.log("Checkout");
    const {priceInfo, foodList, userInfo, paymentInfo } = this.state;
    return (
      <div className="container wrapper">
        <div className="row cart-head">
          <div className="container">
            <div className="row">
              <p />
            </div>
            <div className="row">
              <p />
            </div>
          </div>
        </div>    
        <div className="row cart-body">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-push-6 col-sm-push-6">
              {/*REVIEW ORDER*/}
              <div className="panel panel-primary">
                <div className="panel-heading">
                  Review Order <div className="pull-right"><small><a className="afix-1" href="#">Edit Cart</a></small></div>
                </div>
                <div className="panel-body">
                {foodList.map(food => {
                  return (
                    <div key={food.foodId} className="form-group">
                      <div className="col-sm-3 col-xs-3">
                        <img className="img-responsive" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" />
                      </div>
                      <div className="col-sm-6 col-xs-6">
                        <div className="col-xs-12">{food.name}</div>
                        <div className="col-xs-12"><small>Quantity:<span>{food.amount}</span></small></div>
                      </div>
                      <div className="col-sm-3 col-xs-3 text-right">
                        <h6><span>$</span>{food.totalPrice}</h6>
                      </div>
                      <div className="form-group"><hr /></div>

                    </div>
                  )
                })}
                  <div className="form-group"><hr /></div>
                  <div className="form-group">
                    <div className="col-xs-12">
                      <strong>Subtotal</strong>
                      <div className="pull-right"><span>$</span><span>{priceInfo.subtotal}</span></div>
                    </div>
                    <div className="col-xs-12">
                      <small>Tax</small>
                      <div className="pull-right"><span>{priceInfo.tax}</span></div>
                    </div>
                    <div className="col-xs-12">
                      <small>Shipping</small>
                      <div className="pull-right"><span>0.00</span></div>
                    </div>                    
                  </div>
                  <div className="form-group"><hr /></div>
                  <div className="form-group">
                    <div className="col-xs-12">
                      <strong>Order Total</strong>
                      <div className="pull-right"><span>$</span><span>{priceInfo.total}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              {/*REVIEW ORDER END*/}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-pull-6 col-sm-pull-6">
              {/*SHIPPING METHOD*/}
              <div className="panel panel-primary">
                <div className="panel-heading">Address</div>
                <div className="panel-body">
                  <div className="form-group">
                    <div className="col-md-12">
                      <h4>Shipping Address</h4>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6 col-xs-12">
                      <strong>First Name:</strong>
                      <input type="text" name="first_name" value={userInfo.firstName} onChange={this.handleFirstNameChange} className="form-control" required/>
                    </div>
                    <div className="span1" />
                    <div className="col-md-6 col-xs-12">
                      <strong>Last Name:</strong>
                      <input type="text" name="last_name" value={userInfo.lastName} onChange={this.handleLastNameChange} className="form-control" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Address:</strong></div>
                    <div className="col-md-12">
                      <input type="text" name="address" value={userInfo.address} onChange={this.handleAddressChange} className="form-control" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>City:</strong></div>
                      <div className="col-md-12">
                      <input type="text" name="City" value={userInfo.city} onChange={this.handleCityChange} className="form-control" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Province:</strong></div>
                    <div className="col-md-12">
                      <select id="Province" name="Province" onChange={this.handleProvinceChange} className="form-control" required>
                        <option value="">Province</option>
                        <option value={'BC'}>British Columbia</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Zip / Postal Code:</strong></div>
                    <div className="col-md-12">
                      <input type="text" name="zip_code" value={userInfo.zipCode} onChange={this.handleZipCodeChange} className="form-control" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Phone Number:</strong></div>
                    <div className="col-md-12">
                      <input type="text" name="phone_number" value={userInfo.phoneNumber} onChange={this.handlePhoneNumberChange} className="form-control" required/></div>
                    </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Email Address:</strong></div>
                    <div className="col-md-12">
                    <input type="text" name="email_address" value={userInfo.email} onChange={this.handleEmailChange} className="form-control" required/></div>
                  </div>
                </div>
              </div>
              {/*SHIPPING METHOD END*/}
              {/*CREDIT CART PAYMENT*/}
              <div className="panel panel-primary">
                <div className="panel-heading"><span><i className="glyphicon glyphicon-lock" /></span> Secure Payment</div>
                <div className="panel-body">
                  <div className="form-group">
                    <div className="col-md-12"><strong>Card Type:</strong></div>
                    <div className="col-md-12">
                      <select id="CreditCardType" name="CreditCardType" onChange={this.hadnleCardTypeChange} className="form-control" required>
                        <option >Card Type</option>
                        <option value={'visa'}>Visa</option>
                        <option value={'master'}>MasterCard</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Card holder's Name:</strong></div>
                    <div className="col-md-12"><input type="text" className="form-control" name="car_number" value={paymentInfo.cardHolder} onChange={this.handleCardHolderChange} required/></div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Card Number:</strong></div>
                    <div className="col-md-12"><input type="text" className="form-control" name="car_number" value={paymentInfo.cardNum} onChange={this.handleCardNumberChange} required/></div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12"><strong>Card CVV:</strong></div>
                    <div className="col-md-12"><input type="password" className="form-control" name="car_code" value={paymentInfo.cvv} onChange={this.handleCVVChange} required/></div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <strong>Expiration Date</strong>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <select className="form-control" name="expire_month" onChange={this.handleExpireMonthChange} required>
                        <option value="">Month</option>
                        <option value={'01'}>01</option>
                        <option value={'02'}>02</option>
                        <option value={'03'}>03</option>
                        <option value={'04'}>04</option>
                        <option value={'05'}>05</option>
                        <option value={'06'}>06</option>
                        <option value={'07'}>07</option>
                        <option value={'08'}>08</option>
                        <option value={'09'}>09</option>
                        <option value={'10'}>10</option>
                        <option value={'11'}>11</option>
                        <option value={'12'}>12</option>
                      </select>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <select className="form-control" name="expire_year" onChange={this.handleExpireYearChange} required>
                        <option value="">Year</option>
                        <option value={'2016'}>2016</option>
                        <option value={'2017'}>2017</option>
                        <option value={'2018'}>2018</option>
                        <option value={'2019'}>2019</option>
                        <option value={'2020'}>2020</option>
                        <option value={'2021'}>2021</option>
                        <option value={'2022'}>2022</option>
                        <option value={'2023'}>2023</option>
                        <option value={'2024'}>2024</option>
                        <option value={'2025'}>2025</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <button type="submit" className="btn btn-primary btn-submit-fix">Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
              {/*CREDIT CART PAYMENT END*/}
            </div>
          </form>
        </div>
        <div className="row cart-footer">
        </div>
      </div>
    );
  }
}

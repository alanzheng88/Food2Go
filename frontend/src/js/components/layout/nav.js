import React from "react";
import { IndexLink, Link } from "react-router";
import { Button, NavDropdown, MenuItem, Navbar, FormGroup, FormControl} from 'react-bootstrap';
import userStore from "../../stores/userStore";


export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
      loginStatus: userStore.getLoginStatus(),
      popup: false,
    };
    this.updateLoginStatus = this.updateLoginStatus.bind(this);

  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  componentWillMount() {
    userStore.on("loginStatusChange", this.updateLoginStatus);
  }

  componentWillUnmount() {
    userStore.removeListener("loginStatusChange", this.updateLoginStatus);
  }

  updateLoginStatus(restaurantNumber) {
    this.setState({loginStatus: userStore.getLoginStatus()});
    this.setState({popup: restaurantNumber == 0});
    // console.log("restaurantNumber" + restaurantNumber + "popup: " + this.state.popup);
  }

  render() {
    const { location} = this.props;
    const { collapsed, loginStatus } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    if (loginStatus) {
      return (
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li activeClassName="active" onlyActiveOnIndex={true}>
                  <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Food2Go</IndexLink>
                </li>
                <li activeClassName="active">
                  <Link to="Restaurants" onClick={this.toggleCollapse.bind(this)}>Restaurants</Link>
                </li>
                <li activeClassName="active">
                  <Link to="Register" onClick={this.toggleCollapse.bind(this)}>Register</Link>
                </li>
                <Navbar.Form pullLeft>
                  <FormGroup>
                    <FormControl type="text" placeholder="Search" />
                  </FormGroup>
                  {' '}
                  <Button type="submit">Submit</Button>
                </Navbar.Form>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li activeClassName="active">
                  <Link to="ShoppingCart" onClick={this.toggleCollapse.bind(this)}>Shopping Cart</Link>
                </li>
                  <NavDropdown  activeClassName="active" title="User">
                    <MenuItem href="#UserInfo" onClick={this.toggleCollapse.bind(this)}>User Info </MenuItem>
                    <MenuItem href="#Logout" onClick={this.toggleCollapse.bind(this)}>Logout </MenuItem>
                  </NavDropdown>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
        return (
          <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>
              <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                  <li activeClassName="active" onlyActiveOnIndex={true}>
                    <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Food2Go</IndexLink>
                  </li>
                  <li activeClassName="active">
                    <Link to="Restaurants" onClick={this.toggleCollapse.bind(this)}>Restaurants</Link>
                  </li>
                  <li activeClassName="active">
                    <Link to="Register" onClick={this.toggleCollapse.bind(this)}>Register</Link>
                  </li>
                  <Navbar.Form pullLeft>
                    <FormGroup>
                      <FormControl type="text" placeholder="Search" />
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                  </Navbar.Form>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                  <li activeClassName="active">
                   <Link to="Login" onClick={this.toggleCollapse.bind(this)}>Login </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
      }
  }
}
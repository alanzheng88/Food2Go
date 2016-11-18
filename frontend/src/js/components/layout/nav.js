import React from "react";
import { IndexLink, Link } from "react-router";
import { Button, NavDropdown, MenuItem, Navbar, FormGroup, FormControl} from 'react-bootstrap';

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

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
                <MenuItem href="#Account" onClick={this.toggleCollapse.bind(this)}>Account Info </MenuItem>
                <MenuItem href="#Login" onClick={this.toggleCollapse.bind(this)}>Login </MenuItem>
                <MenuItem href="#Register" onClick={this.toggleCollapse.bind(this)}>Register </MenuItem>
              </NavDropdown>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

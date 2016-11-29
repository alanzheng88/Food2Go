import React from "react";
import { IndexLink, Link } from "react-router";
import { Button, NavDropdown, MenuItem, Navbar, FormGroup, FormControl} from 'react-bootstrap';
import userStore from "../../stores/userStore";
import * as LoginActions from "../../actions/loginActions";
  
export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      loginStatus: userStore.getLoginStatus(),
      userInfo: userStore.getUserInfo(),
    };
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  componentWillMount() {
    userStore.on("auth_success", this.updateLoginStatus);
    userStore.on("logout", this.updateLoginStatus);
    userStore.on("update_userinfo", this.updateUserInfo);
  }

  componentWillUnmount() {
    userStore.removeListener("auth_success", this.updateLoginStatus);
    userStore.removeListener("logout", this.updateLoginStatus);
    userStore.removeListener("update_userinfo", this.updateUserInfo);
  }

  handleLogout(event) {
    console.log("handleLogout: this.props", this.props);
    LoginActions.logoutUser();
    this.props.router.push('/');
  }

  updateUserInfo(userInfo) {
    this.setState({userInfo: userInfo});
  }

  updateLoginStatus(loginStatus) {
    this.setState({loginStatus: loginStatus});
    if(loginStatus) {
      LoginActions.getUserInfo();
    }
  }

  render() {
    const { location } = this.props;
    const { userInfo, collapsed, loginStatus } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    return (
      <div>

      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li /*activeClassName="active"*/ /*onlyActiveOnIndex={true}*/>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Food2Go</IndexLink>
              </li>
              <li /*activeClassName="active"*/>
                <Link to="restaurants" onClick={this.toggleCollapse.bind(this)}>Restaurants</Link>
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
                <li /*activeClassName="active"*/>
                  <Link to="shoppingcart" onClick={this.toggleCollapse.bind(this)}>Shopping Cart</Link>
                </li>
              {!loginStatus &&
                <li /*activeClassName="active"*/>
                  <Link to="register" onClick={this.toggleCollapse.bind(this)}>Register</Link>
                </li>
              }
              {loginStatus &&
                <NavDropdown id = 'dropdown-size-medium' /*activeClassName="active"*/ title="User">
                  <MenuItem eventKey='1' href="#UserInfo" onClick={this.toggleCollapse.bind(this)}>User Info </MenuItem>
                  <MenuItem eventKey='2'  onClick={this.handleLogout} >Logout </MenuItem>
                </NavDropdown>
              }
              {!loginStatus &&
                <li /*activeClassName="active"*/>
                  <Link to="login" onClick={this.toggleCollapse.bind(this)}>Login </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
      {userInfo.role === 'restaurantOwner' && userInfo.role === 'restaurantOwner' &&
        <div class="alert alert-info" role="alert">
          Looks like you haven&apos;t created a restaurant yet.&nbsp; 
          <Link to="restaurant/create" onClick={this.toggleCollapse.bind(this)}>Click here to create your first restaurant!</Link>
        </div>
      }
      </div>
    );
  }
}

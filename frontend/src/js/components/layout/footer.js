import React from "react";
import { IndexLink, Link } from "react-router";



export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container text-center">
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <div className="col-md-3">
              <ul className="nav nav-pills nav-stacked">
                <li><h4>About Food2Go</h4></li>

                <li><IndexLink to="/">About us</IndexLink></li>
                <li><Link to ="/">What's New</Link></li>
                <li><Link to ="/">Join Food2Go</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="nav nav-pills nav-stacked">
                <li><h4>For Restaurant Owners</h4></li>
                <li><Link to ="/">Become our partner</Link></li>
                <li><Link to ="/">Edit your bussiness page</Link></li>
                <li><Link to ="/">Bussiness support</Link></li>          
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="nav nav-pills nav-stacked">
                <li><h4>Support</h4></li>
                <li><Link to ="/">Customer Service</Link></li>
                <li><Link to ="/">Contact us</Link></li>
                <li><Link to ="/">FAQ</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <div className="text-center center-block">
                <h4>Follow us</h4>
                <br />
                <a href="https://www.facebook.com/bootsnipp"><i className="fa fa-facebook-square fa-3x social" /></a>
                <a href="https://twitter.com/bootsnipp"><i className="fa fa-twitter-square fa-3x social" /></a>
                <a href="https://plus.google.com/+Bootsnipp-page"><i className="fa fa-google-plus-square fa-3x social" /></a>
                <a href="mailto:bootsnipp@gmail.com"><i className="fa fa-envelope-square fa-3x social" /></a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <ul className="nav nav-pills nav-justified">
              <li><IndexLink to="/" >© 2016 Food2Go</IndexLink></li>
              <li><Link to ="/">Terms of Service</Link></li>
              <li><Link to ="/">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      </footer>
    );
  }
}

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

                <li><IndexLink to="AboutUs">About us</IndexLink></li>
                <li><Link to ="WhatIsNew">What's New</Link></li>
                <li><Link to ="ContactUs">Join Food2Go</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="nav nav-pills nav-stacked">
                <li><h4>For Restaurant Owners</h4></li>
                <li><Link to ="Register">Become our partner</Link></li>
                <li><Link to ="restaurant/create">Edit your business page</Link></li>
                <li><Link to ="ContactUs">Business support</Link></li>          
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="nav nav-pills nav-stacked">
                <li><h4>Support</h4></li>
                <li><Link to ="CustomerService">Customer Service</Link></li>
                <li><Link to ="ContactUs">Contact us</Link></li>
                <li><Link to ="FAQ">FAQ</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <div className="text-center center-block">
                <h4>Follow us</h4>
                <br />
                <a href="https://www.facebook.com/Food2Go-1659070711051820/"><i className="fa fa-facebook-square fa-3x social" /></a>
                <a href="https://twitter.com/GoFood2Go"><i className="fa fa-twitter-square fa-3x social" /></a>
                { false && <a href="https://plus.google.com/+Food2Go"><i className="fa fa-google-plus-square fa-3x social" /></a> }
                <a href="mailto:gofood2go@gmail.com"><i className="fa fa-envelope-square fa-3x social" /></a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <ul className="nav nav-pills nav-justified">
              <li>@2016 Food2Go</li>
              <li><Link to ="TermsOfService">Terms of Service</Link></li>
              <li><Link to ="Privacy">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      </footer>
    );
  }
}

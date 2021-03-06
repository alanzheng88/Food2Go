import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/footer";
import Nav from "../components/layout/nav";

export default class Layout extends React.Component {
  render() {
    const { location, router } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    console.log("layout");
    return (
      <div>
        <Nav router={router} location={location} />  
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
              {this.props.children}
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

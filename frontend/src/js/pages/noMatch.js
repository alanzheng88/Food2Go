import React from "react";

export default class NoMatch extends React.Component {
  render() {
    console.log("noMatch");
    return (
	<div>
      <h1 class="noMatch">Whoops! This page doesn't exist!</h1>
	  <p class="emoji">😕</p>
	  <h3 class="noMatch">You shouldn't be here, if you got here through a link on the site, please contact the site administrator.</h3>
	</div>
    );
  }
}

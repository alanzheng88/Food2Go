import React from "react";
import SearchInput, {createFilter} from 'react-search-input';
import axios from "axios";

const KEYS_TO_FILTERS = ['name', 'foodType', 'ingredient'];

export default class OrderNow extends React.Component {
	render() {
    console.log("OrderNow");
    return (
    	<h1>Food List of selected Restaurant</h1>
    );
  }
}

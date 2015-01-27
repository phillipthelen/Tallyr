/**
 * Created by viirus on 27.01.15.
 */

var React = require('react');
var public_list = require("./public-list.jsx");
console.log(public_list);

React.render(
      React.createElement(public_list, {url: "", pollInterval: 300000}),
      document.getElementById("public_list")
);
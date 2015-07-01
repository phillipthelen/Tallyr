/**
 * Created by viirus on 27.01.15.
 */

var React = require('react');
var public_list = require("./public-list.jsx");

React.render(
    React.createElement(public_list, {url: "/api/public/", add_url: "/api/tally/add/", change_balance_url: "/api/balance/change/",
          pollInterval: 10000,
          initialItems: items_list}),
    document.getElementById("public_list")
);
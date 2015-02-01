var React = require("react/addons");
var JS = require('jstest');
var TestUtils = React.addons.TestUtils;
var BalanceForm = require("../../static-src/tallymodal.jsx").BalanceForm;

JS.Test.describe("BalanceForm", function() { with(this) {
    before(function() { with(this) {
        var form;
        var changeBalance = function() {
        };
        var changeBalanceSign = function(sign) {
            var balance_change = form.props.balance_change;
            if (sign === "+") {
                balance_change = Math.abs(balance_change);
            } else {
                balance_change = -Math.abs(balance_change);
            }
            form.setProps({balance_change: balance_change});
        };

        this.balanceform = TestUtils.renderIntoDocument(
          <BalanceForm balance_change={1.0}
            changeBalance={changeBalance}
            changeBalanceSign={changeBalanceSign}/>
        );
        form = this.balanceform;
    }});

    it("sign buttons display correct", function() { with(this) {
        var buttongroup = TestUtils.findRenderedDOMComponentWithClass(this.balanceform, "uk-button-group").getDOMNode();
        assertEqual("uk-button uk-width-1-2 uk-button-large uk-active uk-button-success", buttongroup.children[0].className);
        assertEqual("uk-button uk-width-1-2 uk-button-large ", buttongroup.children[1].className);
        this.balanceform.setProps({balance_change: -1.0});
        assertEqual("uk-button uk-width-1-2 uk-button-large ", buttongroup.children[0].className);
        assertEqual("uk-button uk-width-1-2 uk-button-large uk-active uk-button-danger", buttongroup.children[1].className);
    }});

    it("sign buttons toggle", function() { with(this) {
        var input = TestUtils.findRenderedDOMComponentWithTag(this.balanceform, "input").getDOMNode();
        var buttongroup = TestUtils.findRenderedDOMComponentWithClass(this.balanceform, "uk-button-group").getDOMNode();
        assertEqual("1", input.value);
        TestUtils.Simulate.click(buttongroup.children[1]);
        assertEqual("-1", input.value);
        TestUtils.Simulate.click(buttongroup.children[0]);
        assertEqual("1", input.value);
    }});
}});
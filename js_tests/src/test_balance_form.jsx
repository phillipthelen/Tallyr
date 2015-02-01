var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var BalanceForm = require("../../static-src/tallymodal.jsx").BalanceForm;


describe("BalanceForm", function() {
    var balance_form;

    beforeEach(function() {
        var changeBalance = function() {

        };
        var changeBalanceSign = function(sign) {
            var balance_change = balance_form.props.balance_change;
            if (sign === "+") {
                balance_change = Math.abs(balance_change);
            } else {
                balance_change = -Math.abs(balance_change);
            }
            balance_form.setProps({balance_change: balance_change});
        };

        balance_form = TestUtils.renderIntoDocument(
            <BalanceForm balance_change={1.0}
                changeBalance={changeBalance}
                changeBalanceSign={changeBalanceSign}/>
        );
    });

    describe("sign buttons", function() {
        it("shold display", function() {
            var buttongroup = TestUtils.findRenderedDOMComponentWithClass(balance_form, "uk-button-group").getDOMNode();
            expect(buttongroup.children[0].className).toEqual("uk-button uk-width-1-2 uk-button-large uk-active uk-button-success");
            expect(buttongroup.children[1].className).toEqual("uk-button uk-width-1-2 uk-button-large ");
            balance_form.setProps({balance_change: -1.0});
            expect(buttongroup.children[0].className).toEqual("uk-button uk-width-1-2 uk-button-large ");
            expect(buttongroup.children[1].className).toEqual("uk-button uk-width-1-2 uk-button-large uk-active uk-button-danger");
        });

        it("should toggl", function() {
            var input = TestUtils.findRenderedDOMComponentWithTag(balance_form, "input").getDOMNode();
            var buttongroup = TestUtils.findRenderedDOMComponentWithClass(balance_form, "uk-button-group").getDOMNode();
            expect(input.value).toEqual("1");
            TestUtils.Simulate.click(buttongroup.children[1]);
            expect(input.value).toEqual("-1");
            TestUtils.Simulate.click(buttongroup.children[0]);
            expect(input.value).toEqual("1");
        });
    });
});
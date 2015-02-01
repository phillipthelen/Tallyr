/**
 * Created by viirus on 01.02.15.
 */
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var PublicList = require("../../static-src/public-list.jsx");


describe("PublicList", function() {
    var public_list, div;

    beforeEach(function() {
        jasmine.Ajax.install();
        jasmine.Ajax.stubRequest('/api/public/').andReturn({
            "responseText": '[{"pk": 1, "username": "user1", "first_name": "", "last_name": "", "balance": -0.8, "public_tallies": [{"tally_count": 1, "item__pk": 1, "item__name": "drink1", "item__value": 0.8}]}, {"pk": 2, "username": "user2", "first_name": "", "last_name": "", "balance": 1.0, "public_tallies": []}]'
        });

        div = document.createElement('div');
        public_list =  React.render(
            <PublicList url="/api/public/"
                add_url="/api/tally/add/"
                change_balance_url="/api/balance/change/"
                pollInterval={10000}
                initialItems={[]} />, div);
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
        React.unmountComponentAtNode(div);
        console.log(public_list)
    });

    describe("user entries", function() {
        it("should be fetched", function() {
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/public/');
        });

        it("should be displayed", function() {
            var user_list = TestUtils.findRenderedDOMComponentWithClass(public_list, "uk-grid uk-grid-width-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-4").getDOMNode();
            expect(user_list.childNodes.length).toBe(2);
        });

        it("should look correct", function() {
            var user_list = TestUtils.findRenderedDOMComponentWithClass(public_list, "uk-grid uk-grid-width-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-4").getDOMNode();
            var user1_node = $(user_list.childNodes[0]);
            expect(user1_node.find(".uk-panel-title").text()).toBe("user1");
            expect(user1_node.find(".uk-panel-badge").text()).toBe("-0.80 €");
            var tally_list = user1_node.find(".uk-list");
            expect(tally_list.children().length).toBe(1);
            expect(tally_list.find("li").text()).toBe("1 drink1");
        });
    });
});
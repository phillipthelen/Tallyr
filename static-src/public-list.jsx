var React = require("react");

var PublicList = React.createClass({
    render: function() {
        return (
            <div className="uk-grid">
                <div className="uk-width-1-3">
                    <div className="uk-panel uk-panel-box uk-panel-space">
                        <h3 className="uk-panel-title">viirus</h3>
                        X Mate
                    </div>
                </div>
                <div className="uk-width-1-3">
                    <div className="uk-panel uk-panel-box uk-panel-space">
                        <h3 className="uk-panel-title">Test title</h3>
                        Test
                    </div>
                </div>
                <div className="uk-width-1-3">
                    <div className="uk-panel uk-panel-box uk-panel-space">
                        <h3 className="uk-panel-title">Test title</h3>
                        Test
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = PublicList;
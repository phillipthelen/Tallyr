var React = require("react");

var TallyItem = React.createClass({
    render: function() {
        return (
            <li><a className="uk-button uk-button-success uk-button-large uk-width-1-1"
                style={{marginBottom:"15px", padding:"12px"}}
                onClick={this.props.addTally}>
                {this.props.item.name} - {this.props.item.value.toFixed(2)}€
            </a></li>
        )
    }
});

var BalanceForm = React.createClass({
    render: function() {

        var plus_classes = this.props.balance_change >= 0 ? "uk-active uk-button-success" : "";
        var minus_classes = this.props.balance_change < 0 ? "uk-active uk-button-danger" : "";

        return (
            <div className="uk-grid">
                <div className="uk-width-1-3">
                    <div className="uk-button-group uk-width-1-1">
                        <button className={"uk-button uk-width-1-2 uk-button-large "+plus_classes} onClick={this.props.changeBalanceSign.bind(null, "+")}>+</button>
                        <button className={"uk-button uk-width-1-2 uk-button-large "+minus_classes} onClick={this.props.changeBalanceSign.bind(null, "-")}>-</button>
                    </div>
                </div>
                <div className="uk-width-2-3">
                    <input type="text"
                        className="uk-form-large uk-width-1-1"
                        value={this.props.balance_change}
                        onChange={this.props.changeBalance}></input>
                </div>
            </div>
        )
    }
});

var TallyModal = React.createClass({

    componentDidMount: function() {
        var hideModalEvent = this.props.hideModalEvent;
        $('#tallyModal').on({

            'hide.uk.modal': function(){
                hideModalEvent();
            }
        });
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (prevProps.displayModal !== this.props.displayModal) {
            var modal = UIkit.modal("#tallyModal");
            if (this.props.displayModal === true) {
                modal.show();
            } else {
                modal.hide();
            }
        }
    },

    render: function() {
        if (this.props.user == undefined) {
            return <div id="tallyModal" className="uk-modal"></div>
        }
        var itemNodes = this.props.items.map(function(item) {
            return (<TallyItem key={item.name} item={item} addTally={this.props.addTally.bind(null, this.props.user, item.pk)} />);
        }, this);
        return (
            <div id="tallyModal" className="uk-modal">
                <div className="uk-modal-dialog uk-modal-dialog-large">
                    <a className="uk-modal-close uk-close"></a>
                    <div className="uk-modal-header"><h2>for {this.props.user.username}</h2></div>
                    <ul className="uk-grid uk-grid-width-1-2">
                        <li>
                            <h3>Add Tally</h3>
                            <ul className="uk-list">
                            {itemNodes}
                            </ul>
                        </li>
                        <li>
                            <h3>Change Ballance</h3>
                            <BalanceForm balance_change={this.props.balance_change}
                                changeBalance={this.props.changeBalance}
                                changeBalanceSign={this.props.changeBalanceSign} />
                            <button className="uk-button uk-width-1-1 uk-button-large uk-button-success"
                                onClick={this.props.handleBalanceSubmit}>Change Balance
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
});
module.exports = TallyModal;
module.exports.BalanceForm = BalanceForm;
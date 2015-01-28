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

                        </li>
                    </ul>
                </div>
            </div>
        )
    }
});
module.exports = TallyModal
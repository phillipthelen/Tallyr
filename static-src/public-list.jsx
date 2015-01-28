var React = require("react");
var TallyModal = require("./tallymodal.jsx");

var TallyEntry = React.createClass({
    render: function() {
        return (
            <li>{this.props.tally.tally_count} {this.props.tally.item__name}</li>
        );
    }
});

var BalanceBadge = React.createClass({
    render: function() {
        var badgeColor = "uk-badge-success";
        if (this.props.balance < 0) {
            badgeColor = "uk-badge-danger";
        }

        return (
            <div className={"uk-panel-badge uk-badge "+badgeColor} style={{"fontSize":"15px","fontWeight":"normal","padding":"3px"}}>
                {this.props.balance.toFixed(2)} €
            </div>
        )
    }
});

var UserEntry = React.createClass({
    render: function() {
        var tallyNodes = this.props.user.public_tallies.map(function(tally) {
           return (<TallyEntry tally={tally} key={tally.item__pk} />);
        });
        return (
            <li onClick={this.props.onClick} style={{marginBottom:"20px"}}>
                <div className="uk-panel uk-panel-box">
                    <BalanceBadge balance={this.props.user.balance} key={this.props.user.username+"balance"} />
                    <h3 className="uk-panel-title">{this.props.user.username}</h3>
                    <ul className="uk-list">
                        {tallyNodes}
                    </ul>
                </div>
            </li>
        )
    }
});

var PublicList = React.createClass({
    getInitialState: function() {
        return {
            users: [],
            items: this.props.initialItems,
            displayTallyModal: false,
            selectedUser: null
        }
    },


    loadUsers: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
            this.setState({users: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadUsers();
        setInterval(this.loadUsers, this.props.pollInterval);
    },

    handleUserSelect: function(user) {
        this.setState({displayTallyModal: !this.state.displayTallyModal, currentUser:user});
    },

    hideModalEvent: function() {
        this.setState({displayTallyModal: false, currentUser: undefined });
    },

    addTally: function(user, item_key) {
        $.ajax({
            url: this.props.add_url,
            dataType: 'json',
            method: "POST",
            data: {"user": user.username, "item": item_key},
            success: function(data) {
                this.setState({displayTallyModal: false}, this.loadUsers);
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function() {
        var userNodes = this.state.users.map(function(user) {
            return (
                <UserEntry user={user} key={user.username} onClick={this.handleUserSelect.bind(this, user)} />
            )
        }, this);
        return (
            <div>
                <ul className="uk-grid uk-grid-width-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-4" data-uk-grid-margin>
                    {userNodes}
                </ul>
                <TallyModal
                    displayModal={this.state.displayTallyModal}
                    user={this.state.currentUser}
                    hideModalEvent={this.hideModalEvent}
                    items={this.state.items}
                    addTally={this.addTally}/>
            </div>
        );
    }
});
module.exports = PublicList;
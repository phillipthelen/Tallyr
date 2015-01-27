var React = require("react");

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
            <div className="uk-width-1-3">
                <div className="uk-panel uk-panel-box">
                    <BalanceBadge balance={this.props.user.balance} key={this.props.user.username+"balance"} />
                    <h3 className="uk-panel-title">{this.props.user.username}</h3>
                    <ul className="uk-list">
                        {tallyNodes}
                    </ul>
                </div>
            </div>
        )
    }
});

var PublicList = React.createClass({
    getInitialState: function() {
        return {
            users: [],
            items: this.props.initialItems
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

    render: function() {
        var userNodes = this.state.users.map(function(user) {
            return (
                <UserEntry user={user} key={user.username} />
            )
        });
        return (
            <div className="uk-grid">
                {userNodes}
            </div>
        );
    }
});
module.exports = PublicList;
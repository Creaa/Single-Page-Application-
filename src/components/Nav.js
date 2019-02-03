import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './Notification';
class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	logoutHandler = () => {
		this.props.dispatch({
			type: "loginOut",
		})
	}
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<button type="button" onClick={this.props.config} className="btn btn-primary col-xs-1">Config</button>
				<Notification />
				<button type="button" onClick={this.logoutHandler} className="btn btn-outline-light col-xs-1">Logout</button>
			</nav>
		);
	}
}

const mapStateToProps = (state) => ({
	userLogin: state.login
})


export default connect(mapStateToProps)(Nav)
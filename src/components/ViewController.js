import React, { Component } from 'react';
import Login from "./Login";
import Dashboard from "./Dashboard";
import { connect } from 'react-redux';

class ViewController extends Component {
	render() {
		return (
			<div>
				{this.props.isLogged ? <Dashboard /> : <Login />}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isLogged: state.isLogged,
	userLogin: state.login,
	lang: state.language
})
export default connect(mapStateToProps)(ViewController)
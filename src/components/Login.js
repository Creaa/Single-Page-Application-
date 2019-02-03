import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: "",
			inputButtonDisabled: true,
			credentialsInvalid: false,
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		fetch('http://localhost:5000/login', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"login": this.state.login,
				"password": this.state.password
			})
		})
			.then((res) => res.json())
			.then((data) => {
				if (data === 200) {
					this.props.dispatch({
						type: "loginIn",
						login: this.state.login
					})
				}
				else {
					this.setState({
						credentialsInvalid: true,
						password: '',
					})
				}
			})
	};

	loginInputHandler = (e) => {
		this.setState({
			login: e.target.value
		})
	}

	passwordInputHandler = (e) => {
		this.setState({
			password: e.target.value
		})
	}

	componentDidUpdate = () => {
		if (this.state.login.length > 0 && this.state.password.length > 0 && this.state.inputButtonDisabled) {
			this.setState({
				inputButtonDisabled: false
			})
		}
		else if ((this.state.login.length === 0 || this.state.password.length === 0) && !this.state.inputButtonDisabled) {
			this.setState({
				inputButtonDisabled: true
			})
		}
	}

	render() {
		return (
			<form action="submit" className="login-form d-flex flex-column justify-content-center align-items-center">
				{this.state.credentialsInvalid ? <div className="alert alert-danger" role="alert">
					Wrong credentials! Try again
				</div> : false}
				<input className="login-input border border-primary" type="text" name="userLogin" autoComplete="user-name" placeholder="login" onChange={this.loginInputHandler} value={this.state.login} />
				<input className="password-input border border-primary" type="password" autoComplete="new-password" name="userPassword" placeholder="password" onChange={this.passwordInputHandler} value={this.state.password} />
				<input className="login-submit btn btn-primary btn-sm" disabled={this.state.inputButtonDisabled} type="submit" value="Log in" onClick={this.handleSubmit} />
			</form>
		);
	}
}
const mapStateToProps = (state) => ({

})
export default connect(mapStateToProps)(Login)

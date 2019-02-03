import React, { Component } from 'react';
import { connect } from 'react-redux'
class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			display: "none"
		}
	}
	closeWindow = () => {
		this.setState({
			display: "none"
		})
	}
	generateRandomNumber = (max, min) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	componentWillMount = () => {
		let intervalId = setInterval(() => {
			let typeOfNotification = this.generateRandomNumber(3, 1)
			switch (typeOfNotification) {
				case 1:
					this.setState({
						type: "Info"
					})

					break;
				case 2:
					this.setState({
						type: "Warning"
					})

					break;
				case 3:
					this.setState({
						type: "Danger"
					})

					break;
			}

			this.setState({
				display: "block",
				intervalId: intervalId
			})
		}, this.generateRandomNumber(10000, 5000));
	}

	componentWillUnmount = () => {
		clearInterval(this.state.intervalId)
	}
	render() {
		let date = new Date()
		let hour = date.getTime
		return (
			<div className={`alert alert-${this.state.type.toLowerCase()} col-xs-4 mb-0`} style={{
				display: this.props.notificationList.includes(this.state.type) ? this.state.display : "none"
			}}>
				<p className="h6 mb-0">{this.state.type === "Danger" ? "Error" : this.state.type}: {date.toLocaleDateString()} <i className="fa fa-close pl-10" onClick={this.closeWindow}></i></p>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	notificationList: state.notificationToShow
})

export default connect(mapStateToProps)(Notification)
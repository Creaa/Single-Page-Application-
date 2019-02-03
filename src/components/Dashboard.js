import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav'
import Sidebar from './Sidebar';
import Mainarea from './Mainarea';
import Config from './Config'
import './Dashboard.css';


class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "Mainarea"
		}
	}

	configHandler = () => {
		this.setState({
			display: "Config"
		})
	}

	mainAreaHanlder = () => {
		this.setState({
			display: "MainArea"
		})
	}

	clickHandler = (value) => {
		let spllitted = value.split(" ");
		if (spllitted.length === 2) {
			spllitted.splice(1, 0, "-");
		}
		let joined = spllitted.join(" ");
		this.setState({
			clickedItem: joined
		})
	}
	render() {
		return (
			<div style={{
				overflow: "hidden"
			}}>
				<Nav config={this.configHandler} />
				<div className="row">
					<Sidebar config={this.configHandler} main={this.mainAreaHanlder} clickHandler={this.clickHandler} />
					{this.state.display === "Mainarea" ? <Mainarea clickedItem={this.state.clickedItem} /> : <Config />}
				</div>

			</div >
		)
	}
}
const mapStateToProps = (state) => ({
	userLogin: state.login
})


export default connect(mapStateToProps)(Dashboard)
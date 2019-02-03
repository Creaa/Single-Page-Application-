import React, { Component } from 'react';
import './Mainarea.css';

class Mainarea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayConfig: false,
			displayWindowContent: true,
			offsetTop: "0",
			offsetLeft: "0",
			finalWindowPositionX: "20",
			finalWindowPositionY: "120"
		}
	}

	dragStartHandler = (e) => {
		this.setState({
			windowPositionX: e.clientX,
			windowPositionY: e.clientY,
		})
	}
	dragOverHandler = (e) => {
		this.setState({
			windowNewPositionX: e.clientX,
			windowNewPositionY: e.clientY,
		})
	}



	dropHandler = (e) => {
		let d = document.getElementById("window");
		let newPositionX = d.offsetLeft - (this.state.windowPositionX - this.state.windowNewPositionX);
		let newPositionY = d.offsetTop - (this.state.windowPositionY - this.state.windowNewPositionY);
		if (newPositionX > 0 && newPositionY > 0) {
			this.setState({
				finalWindowPositionX: newPositionX,
				finalWindowPositionY: newPositionY,
			})
		}
		else {
			console.log(this.state.windowNewPositionX)
			this.setState({
				finalWindowPositionX: this.state.windowPositionX,
				finalWindowPositionY: this.state.windowPositionY

			})
		}
	}


	collapseWindowToggle = () => {
		let currentState = this.state.displayWindowContent
		this.setState({
			displayWindowContent: !currentState
		})
	}
	render() {
		return (
			<div className="col-xl-11 col-lg-10 col-md-9 col-sm-9 col-7 main-section d-flex flex-column justify-content-center align-items-center" onDragOver={this.dragOverHandler}>
				<div draggable onDragStart={this.dragStartHandler} onDragEnd={this.dropHandler}
					id="window" className="window" style={{
						top: `${this.state.finalWindowPositionY}px`,
						left: `${this.state.finalWindowPositionX}px`
					}}>
					<div className="window__bar">
						<i onClick={this.collapseWindowToggle} className="fa fa-window-minimize window__colapse__button"></i>
					</div>
					<div className="window__content" style={{
						display: !this.state.displayWindowContent ? "none" : "block"
					}}>
					</div>
				</div>
				<span className="nav-item-clicked">{this.props.clickedItem}</span>

			</div >)
	}
}

export default Mainarea;
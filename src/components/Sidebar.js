import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './Sidebar.css';


class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	clickHandler = (e) => {
		let value = e.target.id;
		this.props.clickHandler(value)
	}
	render() {
		let allItemsToDisplay = ["Dashboard", "Statistics", "Reports", "Configuration", "Overview"];
		let itemsWithCollapseChilds = ["Statistics", "Reports", "Overview"];
		let childItemsToDisplay = ["Tests", "Devices", "Builds", "Services", "Projects"];
		return (
			<div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-5">
				<ul className="nav bg-dark d-flex flex-column section-menu align-items-start">
					{allItemsToDisplay.map((el1, key) => {
						if (itemsWithCollapseChilds.includes(el1)) {
							return (
								<Collapsible key={key} trigger={el1} >
									<ul key={key} className="collapse-items">
										{childItemsToDisplay.map((el2, key) => {
											return <li key={key}><a href="#" id={`${el1} ${el2}`} onClick={this.clickHandler} className="menu-item">{el2}</a></li>
										})}
									</ul>
								</Collapsible>
							)
						}
						else {
							return <a href="#" key={key} onClick={this.clickHandler} id={el1} className="nav-link">{el1}</a>
						}
					})}
				</ul>
			</div>
		);
	}
}

export default Sidebar;
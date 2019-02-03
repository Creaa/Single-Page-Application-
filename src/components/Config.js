import React, { Component } from 'react';
import langauges from './Langauges';
import { connect } from 'react-redux'
class Config extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allLangauges: [],
			languageButtonDisabled: true,
			checkBoxButtonDisabled: true,
			emailButtonDisabled: true,
			language: this.props.userLanguage,
			userEmail: ''
		}
	}
	componentWillMount = () => {
		let langaugesArray = [];
		let notificationArray = this.props.allowedNotifications // Dalej przekazuje referencję... Zostawiam to tak.
		for (var key in langauges) {
			if (langauges.hasOwnProperty(key)) {
				langaugesArray.push(langauges[key])
			}
		}
		this.setState({
			allLangauges: langaugesArray,
			notificationList: ["Danger", "Warning", "Info"],
			notificationSelected: notificationArray
		})
	}

	languageChangeHandler = (e) => {
		this.setState({
			languageButtonDisabled: false,
			language: e.target.value
		})
	}

	languageButtonHandler = () => {
		this.props.dispatch({
			type: "languageChange",
			newLanguage: this.state.language
		})
		this.setState({
			languageButtonDisabled: true
		})
	}

	checkBoxHandler = (e) => {
		let notificationList = this.state.notificationSelected;
		if (notificationList.includes(e.target.value)) {
			notificationList.splice(notificationList.indexOf(e.target.value), 1)
		}
		else {
			notificationList.push(e.target.value)
		}
		this.setState({
			notificationSelected: notificationList,
			checkBoxButtonDisabled: false
		})
	}

	notificationButtonHandler = () => {
		this.props.dispatch({
			type: "notificationChange",
			newNotificationList: this.state.notificationSelected
		})
		this.setState({
			checkBoxButtonDisabled: true
		})
	}

	emailInputHandler = (e) => {
		this.setState({
			userEmail: e.target.value
		})
		let regExMail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
		if (regExMail.test(e.target.value)) {
			this.setState({
				emailButtonDisabled: false,
			})
		} else {
			this.setState({
				emailButtonDisabled: true,
			})
		}
	}
	emailButtonHandler = () => {
		this.props.dispatch({
			type: "emailChange",
			newEmail: this.state.userEmail
		})
		this.setState({
			emailButtonDisabled: true
		})

	}



	render() {
		return (
			<div className="col-6 main-section d-flex flex-column justify-content-start align-items-start">
				<h4 className="mt-3">Langauge:</h4>
				<select className="form-control" onChange={this.languageChangeHandler} value={this.state.language}>
					{this.state.allLangauges.map((el, key) => {
						if (el.name === this.props.userLanguage) return <option key={key}>{el.name}</option>;
						else if (!el.nativeName.match(/^[a-zA-Z]+$/)) return <option key={key} disabled>{el.name}</option>
						else return <option key={key}>{el.name}</option>
					})}
				</select>
				<button className="btn bg-primary btn-lg mt-3 mb-3" disabled={this.state.languageButtonDisabled} onClick={this.languageButtonHandler} >Save</button>
				<h4>Notifications:</h4>
				<div className="form-check mb-3">
					<form className="d-flex flex-column" action="submit">
						{this.state.notificationList.map((el, key) => {
							return this.state.notificationSelected.includes(el) ? <label key={key}>
								<input type="checkbox" name={el} value={el} checked={this.state.notificationSelected.includes(el)} onChange={this.checkBoxHandler} />{el}</label> : <label key={key}>
									<input type="checkbox" checked={this.state.notificationSelected.includes(el)} onChange={this.checkBoxHandler} name={el} value={el} />{el}
								</label>
						})}
					</form>
				</div>
				<button className="btn bg-primary btn-lg mb-4" disabled={this.state.checkBoxButtonDisabled} onClick={this.notificationButtonHandler} >Save</button>
				<div className="form-group">
					<label><h3>Email address</h3></label>
					<input type="email" className="form-control" value={this.state.userEmail} onChange={this.emailInputHandler} placeholder="Enter email" />
				</div>
				<button className="btn bg-primary btn-lg mb-3" disabled={this.state.emailButtonDisabled} onClick={this.emailButtonHandler} >Save</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	userLanguage: state.language,
	allowedNotifications: state.notificationToShow
})
export default connect(mapStateToProps)(Config)
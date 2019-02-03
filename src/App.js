import React, { Component } from 'react';
import ViewConttroller from './components/ViewController';
import './App.css';
import { createStore } from "redux";
import { Provider } from 'react-redux';

function reducer(state = initialState, action) {
  switch (action.type) {
    case "loginIn":
      return Object.assign({}, state, {
        isLogged: true,
        login: action.login
      })
    case "loginOut":
      return Object.assign({}, state, {
        isLogged: false,
        login: undefined
      })
    case "languageChange":
      return Object.assign({}, state, { language: action.newLanguage })
    case "notificationChange":
      return Object.assign({}, state, { notificationToShow: action.newNotificationList })
    case "emailChange":
      return Object.assign({}, state, { email: action.newEmail })
    default:
      return state
  }
}
const initialState = ({
  isLogged: false,
  login: undefined,
  language: "English",
  notificationToShow: ["Danger", "Warning", "Info"],
  email: ''
})
const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ViewConttroller />
        </div>
      </Provider>
    );
  }

}

export default App;

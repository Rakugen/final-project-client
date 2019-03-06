// import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider'

const reducer = (state = {currentUser: null, currentChatroom: null}, action) => {

  switch(action.type) {
    case 'CHANGE_USER':
      if (action.payload === null){
        return {currentUser: null, currentChatroom: null}
      } else {
        return {...state,
          currentUser: action.payload
        }
      }
    case 'CHANGE_CHATROOM':
      return {...state,
        currentChatroom: action.payload}
    case 'ADD_MESSAGE':
      return {...state,
        currentChatroom: {
          ...state.currentChatroom,
          messages: [...state.currentChatroom.messages, action.payload]
        }
      }
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Router>
  <ActionCableProvider url={`ws://${window.location.hostname}:3000/cable`}>
  <Provider store={store}>
    <App />
  </Provider>
  </ActionCableProvider>
  </Router>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const reducer = (state = {count: 86}, action) => {

  // REDUCERS MUST BE PURE FUNCTIONS
  // ?? NOT DESTRUCTIVELY CHANGING THE OBJECT
  switch(action.type) {
    case 'INCREMENT':
      return {count: state.count + action.amount}
    case 'DECREMENT':
      return {count: state.count - 1}
    default:
      return state
  }
}

const store = createStore(reducer)

// store.subscribe(() => {
//   console.log('the new state is', store.getState())
//   console.log('----------');
// })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

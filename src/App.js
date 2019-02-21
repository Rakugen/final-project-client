import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader.js'
import SideBar from './components/SideBar.js'
import Client from './components/Client.js'
import { Button, Checkbox, Form } from 'semantic-ui-react'

import { connect } from 'react-redux'

class App extends Component {

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(users =>
      this.props.setUser(users[0])
    )
  }

  renderLogin(){
    return(
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }

  renderComponents(){
    return(
      <>
        <AppHeader />
        <SideBar />
        <Client />
      </>
    )
  }

  render() {
    console.log("my props are: ", this.props);

    return (
      <div className="App">
        {this.renderLogin()}
      </div>
    )
  }
} // End of App component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom
  }
}

const mapDispatchToProps = {
    setUser: (user) => ({type: 'CHANGE_USER', payload: user}),
    setChatroom: (chatroom) => ({type: 'CHANGE_CHATROOM', payload: chatroom})
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form, Modal, Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const DEFAULT_STATE = {
  open: false,
  username: '',
  password: '',
  passwordConfirmation: ''
}

class AppHeader extends Component {
  state = DEFAULT_STATE
  show = dimmer => () => this.setState({
    dimmer,
    open: true,
    username: this.props.currentUser.username
  })
  close = () => this.setState({ open: false })

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteUser = () => {
    console.log("DELETE USER");
  }

  editUser = (e) => {
    // e.preventDefault()
    console.log("editting user", this.state)
    // if (this.state.password === this.state.passwordConfirmation){
    // fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     'Content-Type': "application/json",
    //     'Accept': "application/json"
    //   },
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    // })
    // .then(res => res.json())
    // .then((response) => {
    //   if (response.errors){
    //     alert(response.errors)
    //   } else {
    //     // localStorage.setItem("token", response.token)
    //     this.props.setUser(response.user)
    //   }
    // })
    // } else {
    //   alert("Passwords do not match!!")
    // }
  }

  render(){
    const { open, dimmer } = this.state
    return(
      <Menu inverted className="app-header">
        <Menu.Item name='gamepad'>
          <Icon name='hand point down outline' />
          Quack
        </Menu.Item>
        { !this.props.currentUser ?
          <Menu.Menu position="right">
            <Link to="/signup" className="item">
              Sign Up
            </Link>
            <Link to="/login" className="item">
              Log In
            </Link>
          </Menu.Menu>
          :
          <Menu.Menu position="right">
            <Menu.Item>
              {`Welcome, ${this.props.currentUser.username}!`}
            </Menu.Item>
            <Menu.Item onClick={this.show(true)}>
              Edit User
            </Menu.Item>
            <Menu.Item onClick={this.props.logout}>
              <Icon name='power off' />
              Log out
            </Menu.Item>
          </Menu.Menu>
        }
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Edit User</Modal.Header>
          <Modal.Actions>
            <Form >
              <Form.Field>
                 <label>Username</label>
                 <input onChange={this.handleChange} name="username" value={this.state.username} />
              </Form.Field>
              <Form.Field>
                 <label>Password</label>
                 <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
              </Form.Field>
              <Form.Field>
                 <label>Password</label>
                 <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} />
              </Form.Field>
            </Form>
            <Button color='red' onClick={this.deleteUser}>
              Delete User
            </Button>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Update User"
              onClick={this.editUser}
            />
          </Modal.Actions>
        </Modal>
      </Menu>
    )
  }
}  // End of AppHeader Component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
    // currentChatroom: state.currentChatroom
  }
}
const mapDispatchToProps = {
    setUser: (user) => ({type: 'CHANGE_USER', payload: user})
    // setChatroom: (chatroom) => ({type: 'CHANGE_CHATROOM', payload: chatroom})
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)

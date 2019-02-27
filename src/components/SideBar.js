import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Checkbox, Icon, Table, Form, Button, Comment, Header, Modal } from 'semantic-ui-react'

const DEFAULT_STATE = {
  openNewModal: false,
  openSearchModal: false,
  chatroom_name: '',
  description: '',
  chatrooms: []
}

class SideBar extends Component {
  state = DEFAULT_STATE

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/chatrooms/`)
    .then(res => res.json())
    .then(res => this.setState({
      chatrooms: res
    }))
  }

  showNewModal = dimmer => () => this.setState({ dimmer, openNewModal: true })
  closeNewModal = () => this.setState({ openNewModal: false })
  showSearchModal = dimmer => () => this.setState({ dimmer, openSearchModal: true })
  closeSearchModal = () => this.setState({ openSearchModal: false })

  handleClick = (e) => {
    fetch(`http://localhost:3000/api/v1/chatrooms/${parseInt(e.target.id)}`)
    .then(res => res.json())
    .then(res => (
        this.props.setChatroom(res)
      )
    )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createChatroom = (e) => {
    fetch(`http://localhost:3000/api/v1/chatrooms/`, {
      method: "POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "name": this.state.chatroom_name,
        "admin_id": this.props.currentUser.id,
        "description": this.state.description
      })
    })
    .then(res => res.json())
    .then(res => {
      fetch(`http://localhost:3000/api/v1/joins/`, {
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          "user_id": this.props.currentUser.id,
          "chatroom_id": parseInt(res.id)
        })
      })
    })
    .then(() => this.fetchUser())
    .then(() => this.setState(DEFAULT_STATE))
  }

  fetchUser(){
    let token = localStorage.getItem("token")
    if (token){
      fetch(`http://localhost:3000/api/v1/current_user`, {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(res => {
        this.props.setUser(res)
      })
    }
  }

  getChatrooms(){
    console.log("SideBar: ", this.state);
    return(
      (this.props.currentUser) ?
        this.props.currentUser.chatrooms.map(chatroom => {
          return (
            <div
              onClick={(e) => this.handleClick(e)}
              key={chatroom.id}
              id={chatroom.id}>
                {chatroom.name}
            </div>
          )
        })
      : null
    )
  }

  tableContent(){
    let table_contents = (
      this.state.chatrooms.map(chatroom => {
        return (
          <Table.Row key={chatroom.id}>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>{chatroom.name}</Table.Cell>
            <Table.Cell>{chatroom.description}</Table.Cell>
          </Table.Row>
        )
      })
    )

      return (
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Chatroom</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
              {table_contents}

          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>

              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )
  }

  render(){
    const { openNewModal, dimmer } = this.state

    return(
      <Comment.Group>
        <Header>
          Chatrooms
        </Header>
          { (this.props.currentUser) ?
              this.getChatrooms()
            :
              null
          }
        <Button
          content="New Chatroom"
          color="purple"
          labelPosition='left'
          icon="plus square outline"
          onClick={this.showNewModal(true)}/>
        <Button
          content="Search Chatrooms"
          color="olive"
          labelPosition='left'
          icon="search"
          onClick={this.showSearchModal(true)}/>
        <Modal dimmer={dimmer} open={this.state.openNewModal} onClose={this.closeNewModal}>
          <Modal.Header>Create a New Chatroom</Modal.Header>
          <Modal.Actions>
            <Form>
              <Form.Field>
                 <label>Chatroom Name</label>
                 <input onChange={this.handleChange} name="chatroom_name" placeholder='Chatroom Name' />
              </Form.Field>
              <Form.TextArea onChange={this.handleChange} value={this.state.description} name="description" placeholder="Write the chatrooms description here:"/>
            </Form>
            <Button color='black' onClick={this.closeNewModal}>
              Cancel
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Create Chatroom"
              onClick={this.createChatroom}
            />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} open={this.state.openSearchModal} onClose={this.closeSearchModal}>
          <Modal.Header>Search for Chatrooms</Modal.Header>
          <Modal.Actions>
            <Form>
              <Form.Field>
                 <label>Search Chatrooms</label>
                 <input onChange={this.handleChange} name="chatroom_name" placeholder='Chatroom Name' />
              </Form.Field>
            </Form>
            <Modal.Content>
              {this.tableContent()}
            </Modal.Content>
            <Button color='black' onClick={this.closeSearchModal}>
              Cancel
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Search"

            />
          </Modal.Actions>
        </Modal>
      </Comment.Group>
    )
  }
}  // End of SideBar Component

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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Comment, Header } from 'semantic-ui-react'

const DEFAULT_STATE = {
  inputMessage: '',
  messages: {}
}

class Client extends Component {
  state = DEFAULT_STATE

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/messages/`, {
      method: "POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "username": this.props.currentUser.username,
        "user_id": this.props.currentUser.id,
        "chatroom_id": this.props.currentChatroom.id,
        "message_content": this.state.inputMessage
      })
    })
    //NEED to get a new currentChatroom from backend
    //and get the list to refresh
    .then(res => res.json())
    .then(() => this.fetchChatroom())
    .then(() => this.setState({
      inputMessage:''
    }))
  }

  fetchChatroom(){
    fetch(`http://localhost:3000/api/v1/chatrooms/${this.props.currentChatroom.id}`)
    .then(res => res.json())
    .then(res => (this.props.setChatroom(res))
    )
  }


  getMessages(){
    return(
      this.props.currentChatroom.messages.map(message => {
        return (
          <div
            key={message.id}
            id={message.id}>
              {message.username}:
              {message.message_content}

          </div>
        )
      })
    )
  }

  render(){
    return(
      <Comment.Group>
        <Header>
        { (this.props.currentChatroom) ?
            this.props.currentChatroom.name
          :
            null
        }
        </Header>
        { (this.props.currentChatroom) ?
            this.getMessages()
          :
            null
        }
        { (this.props.currentChatroom) ?
            <Form reply onSubmit={(e) => this.handleSubmit(e)}>
              <Form.TextArea onChange={this.handleChange} value={this.state.inputMessage} name="inputMessage" placeholder="Write a message here."/>
              <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
          :
            <div>Select a chatroom</div>
        }

      </Comment.Group>
    )
  }
}  // End of Client Component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom
  }
}
const mapDispatchToProps = {
    // setUser: (user) => ({type: 'CHANGE_USER', payload: user}),
    setChatroom: (chatroom) => ({type: 'CHANGE_CHATROOM', payload: chatroom})
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)

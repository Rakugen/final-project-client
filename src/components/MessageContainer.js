import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Comment, Header } from 'semantic-ui-react'
import dateformat from 'dateformat'

const DEFAULT_STATE = {
  inputMessage: '',
  messages: {}
}

class MessageContainer extends Component {
  state = DEFAULT_STATE

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidMount() {
    this.scrollToBottom()
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://${window.location.hostname}:3000/api/v1/messages/`, {
      method: "POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "color": this.props.currentUser.color,
        "username": this.props.currentUser.username,
        "user_id": this.props.currentUser.id,
        "chatroom_id": this.props.currentChatroom.id,
        "message_content": this.state.inputMessage
      })
    })
    // .then(res => res.json())
    // .then(() => this.fetchChatroom())
    .then(() => this.setState({
      inputMessage:''
    }))
  }

  fetchChatroom(){
    console.log("fetch");
    fetch(`http://${window.location.hostname}:3000/api/v1/chatrooms/${this.props.currentChatroom.id}`)
    .then(res => res.json())
    .then(res => (this.props.setChatroom(res)))
  }

  getMessages(){
    // When # of messages inevitably gets too large,
    // will need to only show the most recent few
    return(
      this.props.currentChatroom.messages.map(message => {
        return (
          <Comment key={message.id}>
          {(this.props.currentUser.id === message.user_id) ?
            <Comment.Content style={{"backgroundColor":message.color}} className="comment-right">
              <Comment.Author className="author">{message.username}</Comment.Author>
              <Comment.Metadata>
                <div>{dateformat(message.created_at)}</div>
              </Comment.Metadata>
              <Comment.Text className="padding">{message.message_content}</Comment.Text>
            </Comment.Content>
            :
            <Comment.Content style={{"backgroundColor":message.color}} className="comment-left">
              <Comment.Author className="author">{message.username}</Comment.Author>
              <Comment.Metadata>
                <div>{dateformat(message.created_at)}</div>
              </Comment.Metadata>
              <Comment.Text className="padding">{message.message_content}</Comment.Text>
            </Comment.Content>
          }
          </Comment>
        )
      })
    )
  }

  render(){
    return(
      <div className="feed">
        <Comment.Group>
          <Header size="large">
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
                <Form.Field>
                  <input onChange={this.handleChange} value={this.state.inputMessage} name="inputMessage" placeholder="Write a message here."/>
                </Form.Field>
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
              </Form>
            :
              <div>Select a chatroom</div>
          }
        </Comment.Group>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    )
  }
}  // End of MessageContainer Component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom,
    currentMessages: state.currentMessages
  }
}
const mapDispatchToProps = {
    setChatroom: (chatroom) => ({type: 'CHANGE_CHATROOM', payload: chatroom})
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer)

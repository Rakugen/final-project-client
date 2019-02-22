import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Comment, Header } from 'semantic-ui-react'


class Client extends Component {

  // componentDidMount(){
  //   fetch('http://localhost:3000/api/v1/users')
  //   .then(res => res.json())
  //   .then(users => this.props.setUser(users[0]))
  //   fetch('http://localhost:3000/api/v1/chatrooms')
  //   .then(res => res.json())
  //   .then(chatrooms => this.props.setChatroom(chatrooms[0]))
  // }

  getMessages(){
    // debugger
    return(
      // (a==b ? true : false)
      (this.props.currentChatroom) ?
      this.props.currentChatroom.messages.map(message => {
        return (
          <Comment.Content>
            <Comment.Author as='a'>{message.user_id}</Comment.Author>
            <Comment.Metadata>

            </Comment.Metadata>
            <Comment.Text>{message.message}</Comment.Text>
          </Comment.Content>
        )
      })
      : null
    )
  }

  render(){
    console.log("Client : my props are: ", this.props);

    return(
      <>
        <Comment.Group>
          <Header>
            Comments
          </Header>
          {this.getMessages()}
        </Comment.Group>
      </>
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
    setUser: (user) => ({type: 'CHANGE_USER', payload: user}),
    setChatroom: (chatroom) => ({type: 'CHANGE_CHATROOM', payload: chatroom})
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Comment, Header } from 'semantic-ui-react'


class SideBar extends Component {
  handleClick = (e) => {
    fetch(`http://localhost:3000/api/v1/chatrooms/${parseInt(e.target.id)}`)
    .then(res => res.json())
    .then(res => (
        this.props.setChatroom(res)
      )
    )
  }

  getChatrooms(){
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

  render(){
    return(
      <Comment.Group>
        <Header>
          VVV Chatrooms VVV
        </Header>
          { (this.props.currentUser) ?
              this.getChatrooms()
            :
              null
          }
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

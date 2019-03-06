import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import MessageContainer from './MessageContainer'
// import { ActionCableConsumer } from 'react-actioncable-provider'


class Client extends React.Component {

  render(){
    // console.log("RENDERING")
    return (
      <Fragment>
        <MessageContainer />
      </Fragment>
    )
  }
} // End of Client component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom,
    currentMessages: state.currentMessages
  }
}
const mapDispatchToProps = {
    setChatroom: (chatroom) => ({type: 'CHANGE_CHATROOM', payload: chatroom}),
    addMessage: (message) => ({type: 'ADD_MESSAGE', payload: message})
}
export default connect(mapStateToProps, mapDispatchToProps)(Client)

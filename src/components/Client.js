import React, { Component } from 'react';
import { connect } from 'react-redux'


class Client extends Component {
  render(){
    return(
      <>
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

export default connect(mapStateToProps)(Client)

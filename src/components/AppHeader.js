import React, { Component } from 'react';
import { connect } from 'react-redux'


class AppHeader extends Component {
  render(){
    return(
      <>
      </>
    )
  }
}  // End of AppHeader Component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom
  }
}

export default connect(mapStateToProps)(AppHeader)

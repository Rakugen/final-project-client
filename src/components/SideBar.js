import React, { Component } from 'react';
import { connect } from 'react-redux'


class SideBar extends Component {
  render(){
    return(
      <>
      </>
    )
  }
}  // End of SideBar Component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom
  }
}

export default connect(mapStateToProps)(SideBar)

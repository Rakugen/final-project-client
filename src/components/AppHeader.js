import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'


class AppHeader extends Component {
  render(){
    return(
      <Menu>
        <Menu.Item name='editorials'>
          Editorials
        </Menu.Item>

        <Menu.Item name='reviews' >
          Reviews
        </Menu.Item>

        <Menu.Item name='upcomingEvents'>
          Upcoming Events
        </Menu.Item>
      </Menu>
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

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class AppHeader extends Component {
  render(){
    return(
      <Menu>
        { !this.props.currentUser ?
          <Menu.Menu position="right">
            <Link to="/signup" className="item">
              Sign Up
            </Link>
            <Link to="/login" className="item">
              Log In
            </Link>
          </Menu.Menu>
          :
          <Menu.Menu position="right">
            <Menu.Item>
              {`Welcome, ${this.props.currentUser.username}!`}
            </Menu.Item>
            <Menu.Item onClick={this.props.logout}>
              Log out
            </Menu.Item>
          </Menu.Menu>
        }
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

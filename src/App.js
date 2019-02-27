import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import AppHeader from './components/AppHeader.js'
import SideBar from './components/SideBar.js'
import Client from './components/Client.js'
import LoginForm from './components/LoginForm.js'
import SignUpForm from './components/SignUpForm.js'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter} from "react-router-dom";

class App extends Component {

  componentDidMount(){
    let token = localStorage.getItem("token")
    if (token){
      fetch(`http://localhost:3000/api/v1/current_user`, {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(res => {
        this.props.setUser(res)
      })
    } else {
      this.props.history.push("/login")
    }
  }

  renderComponents(){
    return(
      <Grid divided>
        <Grid.Column width={4}>
          <SideBar />
        </Grid.Column>
        <Grid.Column width={12}>
          <Client />
        </Grid.Column>
      </Grid>
    )
  }

  logout = () => {
		this.props.setUser(null)
		localStorage.removeItem("token")
		this.props.history.push("/login")
	}

  render() {
    console.log("App : my props are: ", this.props);
    return (
      <div className="App">
        <AppHeader logout={this.logout}/>
        <Switch>
          <Route exact path="/" render={()=> this.renderComponents()} />
          <Route path="/login" render={(routerProps) => <LoginForm login={this.login} {...routerProps}/>}/>
          <Route path="/signup" render={(routerProps) => <SignUpForm signup={this.signup} {...routerProps}/>}/>
        </Switch>
      </div>
    )
  }
} // End of App component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom
  }
}
const mapDispatchToProps = {
    setUser: (user) => ({type: 'CHANGE_USER', payload: user})
    // setChatroom: (chatroom) => ({type: 'CHANGE_CHATROOM', payload: chatroom})
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

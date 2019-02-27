import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Form } from 'semantic-ui-react'
import { withRouter} from "react-router-dom"

const DEFAULT_STATE = {
  username: '',
  password: ''
}

class LoginForm extends Component {
  state = DEFAULT_STATE

  login = (e) => {
    console.log("LOGGING IN")
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors){
        alert(response.errors)
      } else {
        localStorage.setItem("token", response.token)
        this.props.setUser(response.user)
        this.props.history.push(`/`)
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return (
      <Grid columns='three' divided>
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
          <Form onSubmit={(e) => this.login(e)}>
          <Form.Field>
          <label>Username</label>
          <input onChange={this.handleChange} name="username" placeholder='Username' />
          </Form.Field>
          <Form.Field>
          <label>Password</label>
          <input onChange={this.handleChange} type="password" name="password" placeholder='Password' />
          </Form.Field>
          <Button color='orange' type="submit" >Log In!</Button>
          </Form>

          </Grid.Column>
          <Grid.Column>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom
  }
}
const mapDispatchToProps = {
    // login: (username, password) =>
    //   ({type: 'LOGIN', username: username, password: password})
    setUser: (user) => ({type: 'CHANGE_USER', payload: user})
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))

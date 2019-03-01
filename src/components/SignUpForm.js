import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Button, Form } from 'semantic-ui-react'
import { withRouter} from "react-router-dom"

const DEFAULT_STATE = {
  username: '',
  password: '',
  passwordConfirmation: ''
}
class SignUpForm extends Component {
  state = DEFAULT_STATE

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signUp = (e) => {
    if (this.state.password === this.state.passwordConfirmation){
    fetch("http://localhost:3000/api/v1/users", {
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
    } else {
      alert("Passwords do not match!!")
    }
  }

  render(){
    return (
      <Grid columns='three' centered>
        <Grid.Row>
        <Form onSubmit={(e) => this.signUp(e)}>
          <Form.Field>
             <label>Username</label>
             <input onChange={this.handleChange} name="username" placeholder='Username' />
          </Form.Field>
          <Form.Field>
             <label>Password</label>
             <input onChange={this.handleChange} type="password" name="password" placeholder='Password' />
          </Form.Field>
          <Form.Field>
             <label>Password</label>
             <input onChange={this.handleChange} type="password" name="passwordConfirmation" placeholder='Password Confirmation' />
          </Form.Field>
          <Button basic color='orange' type="submit">Create New User</Button>
        </Form>
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
    // signUp: (username, password, passwordConfirmation) =>
    //   ({type: 'SIGNUP', username: username, password: password, passwordConfirmation: passwordConfirmation})
    setUser: (user) => ({type: 'CHANGE_USER', payload: user})
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm))

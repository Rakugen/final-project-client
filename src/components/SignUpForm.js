import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Header, Segment, Grid, Button, Form } from 'semantic-ui-react'
import { withRouter} from "react-router-dom"
import randomColor from 'random-color'

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
    fetch(`http://${window.location.hostname}:3000/api/v1/users`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        color: randomColor().hexString()
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
      alert("Passwords must match.")
    }
  }

  render(){
    return (
      <div className="login-form">
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='orange' textAlign='center'>
              Make a New Account
            </Header>
            <Form size='large' onSubmit={(e) => this.signUp(e)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  onChange={this.handleChange}
                  name="username"
                  placeholder='Username'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  type='password'
                  name="passwordConfirmation"
                  placeholder='Password Confirmation'
                  onChange={this.handleChange}
                />
                <Button color='orange' fluid size='large'>
                  Create New User
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>

    )
  }
}

// <Grid columns='three' centered>
//   <Grid.Row>
//     <Grid.Column>
//     </Grid.Column>
//     <Grid.Column>
//       <Form onSubmit= {(e) => this.signUp(e)}>
//         <Form.Field>
//            <label>Username</label>
//            <input onChange={this.handleChange} name="username" placeholder='Username' />
//         </Form.Field>
//         <Form.Field>
//            <label>Password</label>
//            <input onChange={this.handleChange} type="password" name="password" placeholder='Password' />
//         </Form.Field>
//         <Form.Field>
//            <label>Password</label>
//            <input onChange={this.handleChange} type="password" name="passwordConfirmation" placeholder='Password Confirmation' />
//         </Form.Field>
//         <Button color='orange' type="submit">Create New User</Button>
//       </Form>
//     </Grid.Column>
//     <Grid.Column>
//     </Grid.Column>
//   </Grid.Row>
// </Grid>

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChatroom: state.currentChatroom
  }
}
const mapDispatchToProps = {
    setUser: (user) => ({type: 'CHANGE_USER', payload: user})
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment, Grid, Button, Form } from 'semantic-ui-react'
import { withRouter} from "react-router-dom"

const DEFAULT_STATE = {
  username: '',
  password: ''
}

class LoginForm extends Component {
  state = DEFAULT_STATE

  login = (e) => {
    fetch(`http://${window.location.hostname}:3000/api/v1/login`, {
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
      <div className="login-form">
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='orange' textAlign='center'>
              Log-in to Your Account
            </Header>
            <Form size='large' onSubmit={(e) => this.login(e)}>
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
                <Button color='orange' fluid size='large'>
                  Login
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
//       <Form onSubmit={(e) => this.login(e)}>
//         <Form.Field>
//           <label>Username</label>
//           <input onChange={this.handleChange} name="username" placeholder='Username' />
//         </Form.Field>
//         <Form.Field>
//           <label>Password</label>
//           <input onChange={this.handleChange} type="password" name="password" placeholder='Password' />
//         </Form.Field>
//         <Button color='orange' type="submit" >Log In!</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))

import React, { Component } from 'react'
import { Header, Card, Image } from 'semantic-ui-react'

class Homepage extends Component{

  render(){
    return(
      <>
        <div className="homepage-bg">
          <Header style={{'fontSize': '4em'}}>Welcome to Quack!</Header>
          <Card.Group centered className="card-group">
            <Card>
              <Image size="tiny" src='1600110.svg' centered />
              <Card.Content>
                <Card.Header>Chat</Card.Header>
                <Card.Description>
                  Chat and send messages.
                </Card.Description>
              </Card.Content>
            </Card>
            <Card>
              <Image size="tiny" src='1600120.svg' centered />
              <Card.Content>
                <Card.Header>Share</Card.Header>
                <Card.Description>
                  Stay connected with your friends.
                </Card.Description>
              </Card.Content>
            </Card>
            <Card>
              <Image size="tiny" src='1197426.svg' centered/>
              <Card.Content>
                <Card.Header>Enjoy</Card.Header>
                <Card.Description>
                  Find the chatroom that's right for you.
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </>
    )
  }
} // End of Homepage component

export default Homepage

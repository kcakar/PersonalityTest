import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Input } from 'semantic-ui-react'

export default class TestModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const trigger=(
    <Button onClick={this.handleOpen} compact primary animated='vertical'floated='right' >
        <Button.Content visible>Test Yolla</Button.Content>
        <Button.Content hidden>
            <Icon name='chart pie' />
        </Button.Content>
    </Button>);

    return (
      <Modal closeIcon
        trigger={trigger}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon='browser' content='Test Yollama' />
        <Modal.Content>
          <Modal.Description>
            <Header>Test yollanacak kişinin bilgileri</Header>
            <Input placeholder="İsim"/>
            <Input placeholder="Ünvan"/>
            <Input placeholder="Link" value="asdf" disabled/>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Test linki oluştur
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
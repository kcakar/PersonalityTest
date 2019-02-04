import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Input } from 'semantic-ui-react'

export default class AskCredit extends Component {
  state = { modalOpen: false,personnelTitles:this.props.personnelTitles}

  handleOpen = () => this.setState({ modalOpen: true})

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const trigger=(
        <Button onClick={this.handleOpen}  compact color="teal" animated='vertical'floated='right' >
            <Button.Content visible>Test Hakkı Talebi</Button.Content>
            <Button.Content hidden>
                <Icon name='shop' />
            </Button.Content>
        </Button>);

    return (
      
      <Modal size="mini" closeIcon
        trigger={trigger}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        className="ask-credit"
      >
        <Header icon='browser' content='Test hakkı talebi' />
        <Modal.Content>
          <Modal.Description>
                <Header>Talep etmek istediğiniz test miktarını giriniz</Header>
                <Input placeholder="Miktar" type="number"/><br/>
                <Input placeholder="İletişim mail adresi" type="mail"/><br/>
                <Input placeholder="İletişim telefon adresi" type="phone"/>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.handleClose}>
            <Icon name='checkmark' /> Talebi tamamla
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
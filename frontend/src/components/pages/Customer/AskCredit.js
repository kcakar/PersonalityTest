import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Input } from 'semantic-ui-react'
import {withToastManager} from 'react-toast-notifications';

import ApiHelper from '../../../helpers/ApiHelper';

class AskCredit extends Component {
  constructor(props){
    super(props);
    this.state={ modalOpen: false,amount:0}
    this.handleOpen=this.handleOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.sendCreditRequest=this.sendCreditRequest.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true})

  handleClose = () => this.setState({ modalOpen: false })

  handleChange=(e,{value}) => this.setState({amount:value})

  sendCreditRequest(){
    const {toastManager} =this.props;
    let creditRequest={
      amount:this.state.amount,
      companyId:ApiHelper.user.companyId
    }
    ApiHelper.functions.creditRequest.create(creditRequest)
    .then(()=>{
      this.handleClose();
      toastManager.add('İstek yollandı.', { appearance: 'success' ,autoDismiss: true,autoDismissTimeout:3000});
    })
    .catch(err=>{
        toastManager.add('İstek yollanamadı.', { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
    })
  }

  render() {
    const trigger=(
        <Button onClick={this.handleOpen}  compact color="teal" animated='vertical' floated='right' >
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
                <Input placeholder="Miktar" type="number" onChange={this.handleChange}/><br/>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.sendCreditRequest}>
            <Icon name='checkmark' /> Talebi tamamla
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withToastManager(AskCredit)
import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Input,Segment } from 'semantic-ui-react'
import {  toast } from "react-toastify";

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
    let creditRequest={
      amount:this.state.amount,
      companyId:ApiHelper.user.companyId
    }
    ApiHelper.functions.creditRequest.create(creditRequest)
    .then(()=>{
      this.handleClose();
      toast.success('İstek yollandı.',{position: toast.POSITION.TOP_CENTER});
    })
    .catch(err=>{
        toast.error('İstek yollanamadı.',{position: toast.POSITION.TOP_CENTER});
    })
  }

  render() {
    const trigger=(
        <Button onClick={this.handleOpen}  compact color="teal" animated='vertical'>
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
            <Segment attached>
                <Header>Talep etmek istediğiniz test miktarını giriniz</Header>
                <Input placeholder="Miktar" type="number" onChange={this.handleChange}/><br/>
            </Segment>
            <Button attached="bottom" color='green' onClick={this.sendCreditRequest}>
              <Icon name='checkmark' /> Talebi tamamla
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AskCredit
import React from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class CreditModal extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      modalOpen:false
    }
  }

  handleClose=()=>{
    this.setState({modalOpen:false});
  }

  handleOpen=()=>{
    this.setState({modalOpen:true});
  }

  render(){
    const {name,requestedTest}=this.props.companyData;
    const {type}=this.props;

    const confirmTrigger=(<Button onClick={this.handleOpen} compact basic size="tiny"><Icon color="green" name='handshake outline' /></Button>);
    const rejectTrigger=(<Button onClick={this.handleOpen} compact basic size="tiny"><Icon color="red" name='trash alternate'/></Button>);

    const positive=<span><b>{name}</b> isimli şirkete <b>{requestedTest}</b> adet test hakkı eklemek istediğinize emin misiniz?</span>;
    const negative=<span><b>{name}</b> isimli şirketin talebini reddetmek istediğinize emin misiniz?</span>;

    const textContent = (type==='confirm'? positive:negative);
    const headerContent=(type==='confirm'? `Test hakkı talebini onayla`:`Test hakkı talebini reddet`);
    const trigger= (type==="confirm"?confirmTrigger:rejectTrigger);
    const icon=(type==="confirm"?"handshake outline":"trash alternate")

    return (
      <Modal className="request-modal" trigger={trigger} basic size='small' open={this.state.modalOpen}>
        <Header icon={icon} content={headerContent} />
        <Modal.Content>
          <p>{textContent}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose} basic color='red' inverted>
            <Icon name='remove' /> Vazgeç
          </Button>
          <Button onClick={this.handleClose} color='green' inverted>
            <Icon name='checkmark' /> Onayla
          </Button>
        </Modal.Actions>
      </Modal>);
  }
} 


CreditModal.propTypes = {
    companyData:PropTypes.any.isRequired,
    type:PropTypes.any.isRequired,
}

export default CreditModal

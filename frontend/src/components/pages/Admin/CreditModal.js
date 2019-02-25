import React from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import ApiHelper from '../../../helpers/ApiHelper';
import { toast } from "react-toastify";

class CreditModal extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      modalOpen:false
    }

    this.handleRequest=this.handleRequest.bind(this);
  }

  handleClose=()=>{
    this.setState({modalOpen:false});
  }

  handleOpen=()=>{
    this.setState({modalOpen:true});
  }

  handleRequest=(decision)=>{
    
    this.handleClose();
    ApiHelper.functions.creditRequest.approveReject(this.props.requestData,decision)
        .then(result=>{
          const text=decision?"kabul edildi":"reddedildi";
          toast.success(`İstek ${text}.`,{position: toast.POSITION.TOP_CENTER});
          this.props.getTableData();
    })
    .catch(err=>{
        toast.error(`İstek ile ilgili bir hata oluştu.`,{position: toast.POSITION.TOP_CENTER});
    })
  }

  render(){
    const {companyName,amount}=this.props.requestData;
    const {type}=this.props;

    const confirmTrigger=(<Button onClick={this.handleOpen} compact basic size="tiny"><Icon color="green" name='handshake outline' /></Button>);
    const rejectTrigger=(<Button onClick={this.handleOpen} compact basic size="tiny"><Icon color="red" name='trash alternate'/></Button>);

    const positive=<span><b>{companyName}</b> isimli şirkete <b>{amount}</b> adet test hakkı eklemek istediğinize emin misiniz?</span>;
    const negative=<span><b>{companyName}</b> isimli şirketin talebini reddetmek istediğinize emin misiniz?</span>;

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
          <Button onClick={()=>this.handleRequest(type==="confirm")} color='green' inverted>
            <Icon name='checkmark' /> Onayla
          </Button>
        </Modal.Actions>
      </Modal>);
  }
} 


CreditModal.propTypes = {
    requestData:PropTypes.any.isRequired,
    type:PropTypes.any.isRequired,
    getTableData:PropTypes.func.isRequired
}

export default CreditModal

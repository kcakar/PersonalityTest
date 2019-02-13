import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal,Input,Grid ,Segment,Message} from 'semantic-ui-react';

import ApiHelper from '../../../helpers/ApiHelper';

class AddCompanyModal extends Component {
    constructor(props){
        super(props);
        this.state = { 
            modalOpen: false,
            company:{
                name:"",
                password:"",
                phone:"",
                mail:"",
                credit:"0"
            },
            errors:[]
        }
        this.handleChange=this.handleChange.bind(this);
        this.addCompany=this.addCompany.bind(this);
        this.validate=this.validate.bind(this);
    }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  
  handleChange = (e,{name,value})=>{
      let {company}=this.state;
      company[name]=value;
      this.setState({company});
  }

  addCompany=()=>{
    const {company}=this.state;
    if(this.validate()){
        ApiHelper.functions.company.create(company)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            if(data.errors){
                this.setState({errors:data.errors.map(error=>error.message)});
            }
            else{
                this.handleClose();
                this.props.refreshCompanyTable();
            }
        })
    }
  }

  validate(){
    const {company}=this.state;
    let errors=[];

    if(!company.name || company.name.lenth<3){
        errors.push("İsim alanı zorunludur.");
    }
    if(!company.password || company.password.lenth<3)
    {
        errors.push("Şifre alanı zorunludur.");
    }
    if(!company.mail || company.mail.lenth<3)
    {
        errors.push("Mail alanı zorunludur.");
    }
    this.setState({errors});
    if(errors.length===0){
        return true;
    }
    else{
        return false;
    }
  }

  render() {
    const trigger=(
    <Button onClick={this.handleOpen} compact primary animated='vertical' floated='right' >
        <Button.Content visible>Yeni şirket ekle</Button.Content>
        <Button.Content hidden>
            <Icon name='building outline' />
        </Button.Content>
    </Button>);

    return (
      
      <Modal closeIcon
        trigger={trigger}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        className="add-company"
      >
        <Header icon='browser' content='Şirket ekleyin' />
        <Modal.Content>
          <Modal.Description>
            <Grid>
                <Segment secondary>
                    <Grid.Row>
                        <Grid.Column>
                            <p>Turuncu alanlar zorunludur. <br/>Şirket şifresine bu ekrandan sonra bir daha ulaşamazsınız. <br/>Lütfen şirketi yaratmadan bu şifreyi kopyalayınız.</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {this.state.errors.length>0 && <Message error list={this.state.errors}/>}
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input onChange={this.handleChange} className="required" name="name" placeholder="Şirket ismi" type="text"/>
                            <Input onChange={this.handleChange} className="required" name="password" placeholder="Şifre" type="text"/>
                            <Input onChange={this.handleChange} className="required" name="mail" placeholder="Email" type="mail"/>
                            <Input onChange={this.handleChange} name="phone" placeholder="Telefon" type="phone"/>
                            <Input onChange={this.handleChange} name="credit" placeholder="Kredi miktarı" type="number"/>
                        </Grid.Column>
                    </Grid.Row>
                    <Button color='green' inverted floated="right" onClick={this.addCompany}>
                        <Icon name='checkmark' /> Şirketi ekle
                    </Button>
                </Segment>
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

AddCompanyModal.propTypes = {
    refreshCompanyTable:PropTypes.func.isRequired
}

export default AddCompanyModal
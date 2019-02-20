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

    componentDidMount(){
        this.passGenerator();
    }

  handleOpen = () => {
      this.setState({ modalOpen: true });
      this.passGenerator();
    }

  handleClose = () => this.setState({ modalOpen: false ,company:{ name:"", password:"", phone:"", mail:"", credit:"0" }})
  
  handleChange = (e,{name,value})=>{
      let {company}=this.state;
      company[name]=value;
      this.setState({company});
  }

  addCompany=()=>{
    const {company}=this.state;
    if(this.validate()){
        ApiHelper.functions.company.create(company)
        .then(data=>{
            if(data.errors)
            {
                let errors=data.errors.map(e=>e.message);
                this.setState({errors});
            }
            else{
                this.handleClose();
                setTimeout(() => {
                    this.props.refreshCompanyTable();
                }, 100);
            }
        })
        .catch(err=>{
            this.setState({errors:[err.message]});
        })
    }
  }

  passGenerator=()=>{
    let {company}=this.state;

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 6; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    company.password=text;
    this.setState({company});
  }

  validate(){
    const {company}=this.state;
    let errors=[];

    if(!company.name || company.name.lenth<3){
        errors.push("İsim alanı zorunludur. En az 3 karakterden oluşmalıdır.");
    }
    if(!company.password || company.password.lenth<3)
    {
        errors.push("Şifre alanı zorunludur. En az 3 karakterden oluşmalıdır.");
    }
    if(!company.mail || company.mail.lenth<3)
    {
        errors.push("Mail alanı zorunludur. En az 3 karakterden oluşmalıdır.");
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

    return <Modal closeIcon
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
                            <p>Mail sisteme giriş yapılırken kullanılacaktır.</p>
                            <p>Turuncu alanlar zorunludur.</p>
                            <p>Şirket şifresine bu ekrandan sonra bir daha ulaşamazsınız.</p>
                            <p>Lütfen şirketi yaratmadan bu şifreyi kopyalayınız.</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {this.state.errors.length>0 && <Message error list={this.state.errors}/>}
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input label="Şirket ismi" onChange={this.handleChange} value={this.state.company.name} className="required" name="name" placeholder="Şirket ismi" type="text"/>
                            <Input label="Şifre" onChange={this.handleChange} value={this.state.company.password} className="required" name="password" placeholder="Şifre" type="text" icon={<Icon name='refresh' inverted circular link onClick={this.passGenerator} />}/>
                            <Input label="Kullanıcı adı / Mail" onChange={this.handleChange} value={this.state.company.mail} className="required" name="mail" placeholder="Email" type="mail"/>
                            <Input label="Telefon" onChange={this.handleChange} value={this.state.company.Telefon} name="phone" placeholder="Telefon" type="phone"/>
                            <Input label="Test Hakkı" onChange={this.handleChange} value={this.state.company.credit} name="credit" placeholder="Test Hakkı" type="number"/>
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
    
  }
}

AddCompanyModal.propTypes = {
    refreshCompanyTable:PropTypes.func.isRequired
}

export default AddCompanyModal
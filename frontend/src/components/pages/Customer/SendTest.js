import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, Header, Icon, Modal,Input,Grid,Step ,Segment, Message,Label} from 'semantic-ui-react'
import {  toast } from "react-toastify";

import ApiHelper from '../../../helpers/ApiHelper';
import Urls from '../../../helpers/URLs';

class SendTest extends Component {
  state = { 
    modalOpen: false,
    personnelTitles:this.props.personnelTitles,
    testSession:{
      name:"",
      title:"",
      password:"",
      mail:""
    },
    validate:{
      name:true,
      password:true,
      mail:true
    },
    clipboardText:"",
    isMailApproved:true
  }

  componentDidMount(){
    this.passGenerator();
  }

  handleOpen = () => {this.setState({ modalOpen: true ,currentStep:1});this.passGenerator();this.generateUsername("")}

  handleClose = () =>{ 
    this.props.refreshDashboard();
    this.setState({ modalOpen: false,currentStep:1,testSession:{name:"",title:"",password:"",mail:""} })
  }

  passGenerator=()=>{
    let {testSession}=this.state;

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 6; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    testSession.password=text;
    this.setState({testSession});
  }

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 1 ) {
      if(this.validate())
      {
        this.checkUsername();
      }
    }
    else{
      this.incrementStep();
    }
  }

  incrementStep=()=>{
    let currentStep = this.state.currentStep;
    currentStep++;
    this.setState({ currentStep })
  }
  
  handleChange=(e,{name,value})=>{
    let {testSession}=this.state;
    testSession[name]=value;
    if(name==="name")
    {
      this.generateUsername(value);
    }
    if(name==="mail")
    {
      this.generateExtension(value);
    }
    this.setState({testSession});
    this.validate();
  }

  generateExtension=(username)=>{
    let {testSession}=this.state;
    const companyName= this.normalize(ApiHelper.user.name);
    testSession.mail=`${username}@${companyName}`;
    this.setState({testSession})
  }

  generateUsername=(name)=>{
    let {testSession}=this.state;

    const username= this.normalize(testSession.name);
    const companyName= this.normalize(ApiHelper.user.name);
    testSession.mail=`${username}@${companyName}`;
    this.setState({testSession})
  }

  normalize=(text)=>{
    return text.toString()               // Convert to string
    .normalize('NFD')               // Change diacritics
    .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
    .replace(/\s+/g,'')            // Change whitespace to dashes
    .replace(/&/g,'')          // Replace ampersand
    .replace(/[^a-zA-Z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
    .replace(/-+/g,'-')             // Remove duplicate dashes
    .replace(/^-*/,'')              // Remove starting dashes
    .replace(/-*$/,''); 
  }

  sendTest=()=>{
    

    ApiHelper.functions.test.send(ApiHelper.user.id,this.state.testSession)
    .then(res=>{
      this.nextStep();
    })
    .catch(err=>{
      toast.error(err.message,{position: toast.POSITION.TOP_CENTER});
    })
  }

  validate=()=>{
    let {validate,testSession}=this.state;
    let result=true;
    validate.name=true;
    validate.password=true;
    if(!(testSession.name && testSession.name.length>3))
    {
      result=false;
      validate.name=false;
    }
    if(!(testSession.password && testSession.password.length>5))
    {
      result=false;
      validate.password=false;
    }
    this.setState({validate});
    return result;
  }

  checkUsername=()=>{
    
    ApiHelper.functions.employee.checkUsername(this.state.testSession.mail)
    .then(result=>{
        if(!result.exist){
          this.setState({isMailApproved:true,clipboardText:`Enneagram panel bilgileriniz aşağıdaki gibidir.\n\nGiriş adresi:\n${Urls.server}${Urls.login}\n\nKullanıcı adı:\n${this.state.testSession.mail}\n\nŞifre:\n${this.state.testSession.password}`});
          this.incrementStep();
        }
        else{
          this.setState({isMailApproved:false});
        }
    })
    .catch(err=>{
      toast.error(err.message,{position: toast.POSITION.TOP_CENTER});
    })
  }

  render() {
    const {testSession}=this.state;
    const trigger=(
    <Button onClick={this.handleOpen} compact primary animated='vertical'>
        <Button.Content visible>Test Yolla</Button.Content>
        <Button.Content hidden>
            <Icon name='chart pie' />
        </Button.Content>
    </Button>);

    const step1=(
      <Grid.Row>
        <Grid.Column>
          <Segment attached className="step-1 step" color='yellow' secondary>
              <div className="inputs">
                {!this.state.isMailApproved && <Message error list={["Bu kullanıcı ismi zaten mevcut. Lütfen kullanıcı ismini değiştiriniz."]}/>}
                <Input error={!this.state.validate.name} onChange={this.handleChange} value={testSession.name} label="Çalışan ismi" name="name" placeholder="İsim Soyisim"/>
                <Input onChange={this.handleChange} value={testSession.title} label="Ünvan" name="title" list='titles' placeholder='Ünvan' />
                <datalist id='titles'>
                  {this.state.personnelTitles.map(title=>(
                    <option key={title} value={title} />
                  ))}
                </datalist>
                <Input value={testSession.mail.split('@')[0]}  labelPosition='right'  color='green' error={!this.state.validate.mail} onChange={this.handleChange} name="mail" placeholder="Kullanıcı adı" >
                  <Label>Kullanıcı adı</Label>
                  <input />
                  <Label>@{testSession.mail.split('@')[1]}</Label>
                </Input>
                <Input error={!this.state.validate.password} onChange={this.handleChange} value={testSession.password} label="Şifre" name="password" placeholder="Şifre" icon={<Icon name='refresh' inverted circular link onClick={this.passGenerator} />}/>
              </div>
          </Segment>
          <Button attached='bottom' onClick={this.nextStep} color='orange' >
            <Icon name='address card outline' /> Test linki oluştur
          </Button>
        </Grid.Column>
      </Grid.Row>);

    const step2=(
      <Grid.Row>
        <Grid.Column>
          <Segment attached className="step-2 step"  color='olive' secondary>

            <p>Lütfen aşağıdaki bilgileri kullanıcıya iletiniz.</p>
            <p>Şifre bilgisine bir daha ulaşamayacaksınız.</p>

            <Label as='h3' color='orange' ribbon size="tiny">Kullanıcı adı:</Label>
            <span>{testSession.mail}</span>

            <Label as='h3' color='orange' ribbon size="tiny">Şifre:</Label>
            <span>{testSession.password}</span>

            <div>
              <CopyToClipboard text={this.state.clipboardText}>
                <Button icon labelPosition='left'><Icon name='copy outline' />Bilgileri kopyala</Button>
              </CopyToClipboard>
            </div>

          </Segment>
          <Button attached="bottom" color='olive' onClick={this.sendTest}>
            <Icon name='send' /> Onayla
          </Button>
        </Grid.Column>
      </Grid.Row>
    );

    const step3=(
        <Grid.Row>
          <Grid.Column>
            <Segment attached className="step-3 step" color='green' secondary>
              <p>Test sahibi testini bitirdiği zaman raporlara tablodan ulaşabilirsiniz.</p>
            </Segment>
            <Button attached="bottom" color='green' onClick={this.handleClose}>
              <Icon name='checkmark' /> Tamamla
            </Button>
          </Grid.Column>
        </Grid.Row>
        );

    return (
      
      <Modal closeIcon
        trigger={trigger}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        className="send-test"
      >
        <Header icon='browser' content='Test Yollayın' />
        <Modal.Content>
          <Modal.Description>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Step.Group stackable='tablet'>
                    <Step active={this.state.currentStep===1?true:false}>
                      <Icon name='address card outline' />
                      <Step.Content>
                        <Step.Title>Test</Step.Title>
                        <Step.Description>Testi yapacak kişinin bilgilerini doldurun</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step active={this.state.currentStep===2?true:false}>
                      <Icon name='send' />
                      <Step.Content>
                        <Step.Title>Panel bilgileri</Step.Title>
                        <Step.Description>Bilgileri çalışana yollayın</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step active={this.state.currentStep===3?true:false}>
                      <Icon name='info circle' />
                      <Step.Content>
                        <Step.Title>Rapor</Step.Title>
                        <Step.Description>Sonuçları bekleyin</Step.Description>
                      </Step.Content>
                    </Step>
                  </Step.Group>
                </Grid.Column>
              </Grid.Row>
              {this.state.currentStep===1?step1:""}
              {this.state.currentStep===2?step2:""}
              {this.state.currentStep===3?step3:""}
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

SendTest.propTypes = {
  refreshDashboard:PropTypes.any.isRequired
}

export default SendTest;
import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Input,Grid,Step ,Segment} from 'semantic-ui-react'
import {withToastManager} from 'react-toast-notifications';

import ApiHelper from '../../../helpers/ApiHelper';

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
    isMailApproved:false
  }

  componentDidMount(){
    this.passGenerator();
  }

  handleOpen = () => this.setState({ modalOpen: true ,currentStep:1})

  handleClose = () => this.setState({ modalOpen: false,currentStep:1 })

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
    if (currentStep === 1 && !this.validate()) {
      return;
    }
    currentStep++;
    this.setState({ currentStep })
  }
  
  handleChange=(e,{name,value})=>{
    let {testSession}=this.state;
    testSession[name]=value;
    console.log(name)
    if(name==="name")
    {
      this.generateUsername(value);
    }
    this.setState({testSession});
  }

  generateUsername=(name)=>{
    console.log("generateUsername"+   name)
    let {testSession}=this.state;
    const username= name.toString()               // Convert to string
        .normalize('NFD')               // Change diacritics
        .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
        .replace(/\s+/g,'-')            // Change whitespace to dashes
        .toLowerCase()                  // Change to lowercase
        .replace(/&/g,'-and-')          // Replace ampersand
        .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
        .replace(/-+/g,'-')             // Remove duplicate dashes
        .replace(/^-*/,'')              // Remove starting dashes
        .replace(/-*$/,''); 
    testSession.mail=username;
    this.setState({testSession})
  }

  sendTest=()=>{
    const {toastManager}=this.props;

    ApiHelper.functions.test.send(ApiHelper.user.id,this.state.testSession)
    .then(res=>{
      this.nextStep();
    })
    .catch(err=>{
        toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
    })
  }

  validate=()=>{
    let {validate,testSession}=this.state;
    let result=true;

    if(!testSession.name ||testSession.name.lenth<3)
    {
      result=false;
      validate.name=false;
    }
    if(!testSession.password ||testSession.password.lenth<5)
    {
      result=false;
      validate.password=false;
    }
    if(!testSession.mail || testSession.mail.indexOf(" ")>0)
    {
      result=false;
      validate.mail=false;
    }
    this.setState({validate});
    return result;
  }

  checkUsername=()=>{
    const {toastManager}=this.props;
    ApiHelper.functions.employee.checkUsername(this.state.testSession.mail)
    .then(result=>{
        this.setState({isMailApproved:true});
    })
    .catch(err=>{
        toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
    })
  }

  render() {
    const {testSession}=this.state;
    const trigger=(
    <Button onClick={this.handleOpen} compact primary animated='vertical' floated='right' >
        <Button.Content visible>Test Yolla</Button.Content>
        <Button.Content hidden>
            <Icon name='chart pie' />
        </Button.Content>
    </Button>);

    const step1=(
      <Segment className="step-1" color='yellow' secondary>
        <Grid.Row >
          <Grid.Column className="inputs">
            <Input error={!this.state.validate.name} onChange={this.handleChange} value={testSession.name} label="Çalışan ismi" name="name" placeholder="İsim Soyisim"/>
            <Input onChange={this.handleChange} value={testSession.title} label="Ünvan" name="title" list='titles' placeholder='Ünvan' />
            <datalist id='titles'>
              {this.state.personnelTitles.map(title=>(
                <option key={title} value={title} />
              ))}
            </datalist>
            <Input color='green' error={!this.state.validate.mail} onChange={this.handleChange} value={testSession.mail} label="Kullanıcı adı" name="mail" placeholder="Kullanıcı adı" icon={<Icon name='question circle outline' inverted circular link onClick={this.checkUsername} />}/>
            <Input error={!this.state.validate.password} onChange={this.handleChange} value={testSession.password} label="Şifre" name="password" placeholder="Şifre" icon={<Icon name='refresh' inverted circular link onClick={this.passGenerator} />}/>
            <Button onClick={this.nextStep} color='green' inverted floated="right">
              <Icon name='checkmark' /> Test linki oluştur
            </Button>
          </Grid.Column>
        </Grid.Row> 
      </Segment>);

    const step2=(
      <Segment className="step-2"  color='olive' secondary>
        <Grid.Row>
          <Grid.Column>
            <p>Lütfen aşağıdaki bilgileri kullanıcıya iletiniz.</p>
            <p>Şifre bilgisine bir daha ulaşamayacaksınız.</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <p><b>Kullanıcı adı:</b></p>
            <p>{testSession.name}</p>
            <p><b>Şifre:</b></p>
            <p>{testSession.password}</p>
        </Grid.Row>
        <Button color='green' inverted floated="right" onClick={this.sendTest}>
          <Icon name='checkmark' /> Onayla
        </Button>
      </Segment>
    );

    const step3=(
      <Segment className="step-3" color='green' secondary>
        <Grid.Row>
          <Grid.Column>
            <p>Test sahibi testini bitirdiği zaman raporlara tablodan ulaşabilirsiniz.</p>
            <Button color='green' inverted floated="right" onClick={this.handleClose}>
              <Icon name='checkmark' /> Tamamla
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Segment>
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

export default withToastManager(SendTest);
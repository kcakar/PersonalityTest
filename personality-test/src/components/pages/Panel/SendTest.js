import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Input,Grid,Step ,Segment} from 'semantic-ui-react'

export default class SendTest extends Component {
  state = { modalOpen: false,personnelTitles:this.props.personnelTitles}

  handleOpen = () => this.setState({ modalOpen: true ,currentStep:1})

  handleClose = () => this.setState({ modalOpen: false,currentStep:1 })

  nextStep=() => {const currentStep=this.state.currentStep+1; this.setState({currentStep})}
  
  

  render() {
    const trigger=(
    <Button onClick={this.handleOpen} compact primary animated='vertical'floated='right' >
        <Button.Content visible>Test Yolla</Button.Content>
        <Button.Content hidden>
            <Icon name='chart pie' />
        </Button.Content>
    </Button>);

    const step1=(
      <Segment className="step-1" color='yellow' secondary>
        <Grid.Row >
          <Grid.Column>
            <Input placeholder="İsim Soyisim"/>
            <Input list='titles' placeholder='Ünvan' />
            <datalist id='titles'>
              {this.state.personnelTitles.map(title=>(
                <option key={title} value={title} />
              ))}
            </datalist>
            <Button color='green' inverted floated="right" onClick={this.nextStep}>
              <Icon name='checkmark' /> Test linki oluştur
            </Button>
          </Grid.Column>
        </Grid.Row> 
      </Segment>);

    const step2=(
      <Segment className="step-2"  color='olive' secondary>
        <Grid.Row>
          <Grid.Column>
            <p>Linkiniz aşağıdaki şekilde oluşturuldu. Bu linki ve şifreyi kopyalayıp test sahibine iletebilirsiniz.</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Input value="http://kcakar.github.io/enneagram/Test/?sdfewgdfgadg-sfdgsdfg-sdgdfg-dfgfdgfdg" />
            <Button>
              <Icon name='copy' /> Linki Kopyala
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Input value="12345" />
            <Button>
              <Icon name='copy' /> Şifreyi Kopyala
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Button color='green' inverted floated="right" onClick={this.nextStep}>
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
        <Header icon='browser' content='Test Yollama' />
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
                        <Step.Title>Link</Step.Title>
                        <Step.Description>Ürettiğimiz linki yollayın</Step.Description>
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
        {/* <Modal.Actions>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Test linki oluştur
          </Button>
        </Modal.Actions> */}
      </Modal>
    )
  }
}
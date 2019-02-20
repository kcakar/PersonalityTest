import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal,Input,Grid ,Segment,Message, Checkbox,Popup} from 'semantic-ui-react';

import ApiHelper from '../../../helpers/ApiHelper';

class EditCompanyModal extends Component {

    state = { 
        modalOpen: false,
        company:{
            id:"",
            name:"",
            password:"",
            phone:"",
            mail:"",
            credit:"0"
        },
        isNewPass:false,
        newPass:"",
        errors:[]
    }

    componentDidMount(){
        this.setState({company:this.props.company})
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false ,isNewPass:false,newPass:""})
    
    handleChange = (e,{name,value})=>{
        let {company}=this.state;
        company[name]=value;
        this.setState({company});
    }

    handlePassChange=(e,{value})=>{
        this.setState({newPass:value});
    }

    saveCompany=()=>{
        const {company,isNewPass,newPass}=this.state;
        if(this.validate()){
            ApiHelper.functions.company.update(company,isNewPass,newPass)
            .then(data=>{
                if(data.errors)
                {
                    let errors=data.errors.map(e=>e.message);
                    this.setState({errors});
                }
                else{
                    this.handleClose();
                    this.props.refreshCompanyTable();
                }
            })
            .catch(err=>{
                this.setState({errors:[err.message]});
            })
        }
    }

    validate(){
        const {company,isNewPass,newPass}=this.state;
        let errors=[];

        if(!company.name || company.name.lenth<3){
            errors.push("İsim alanı zorunludur. En az 3 karakterden oluşmalıdır.");
        }
        if(isNewPass &&(newPass.length<3))
        {
            errors.push("Şifre alanı zorunludur. Şifre en az 3 karakterden oluşmalıdır.");
        }
        if(!company.mail || company.mail.lenth<3)
        {
            errors.push("Mail alanı zorunludur. En az 3 karakterden oluşmalıdır.");
        }
        this.setState({errors});
        return errors.length===0 ? true:false
    }

    render() {
        const {company}=this.state;

        const trigger=(
            <Popup style={{opacity:0.9}} basic inverted content="Şirketi düzenle" 
                trigger={
                    <Button icon onClick={this.handleOpen}> 
                        <Icon name='edit outline'/> 
                    </Button>
                    } 
            />);

        return (
        
        <Modal closeIcon
            trigger={trigger}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            className="add-company"
        >
            <Header icon='browser' content={`${this.state.company.name} isimli şirketi düzenleyin`} />
            <Modal.Content>
            <Modal.Description>
                <Grid>
                    <Segment secondary>
                        <Grid.Row>
                            <Grid.Column>
                                <p>Mail sisteme giriş yapılırken kullanılacaktır.</p>
                                <p>Şirket şifresini düzenledikten sonra yeni şifreye bir daha ulaşamazsınız.</p>
                                <p>Kredi miktarı girilen miktara eşitlenir. Varolan miktara eklenmez.</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            {this.state.errors.length>0 && <Message error list={this.state.errors}/>}
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input label="Şirket ismi" onChange={this.handleChange} value={company.name} name="name" placeholder="Şirket ismi" type="text"/>
                                <Input label="Email" onChange={this.handleChange} value={company.mail} name="mail" placeholder="Email" type="mail"/>
                                <Input label="Telefon" onChange={this.handleChange} value={company.phone} name="phone" placeholder="Telefon" type="phone"/>
                                <Input label="Kredi miktarı" onChange={this.handleChange} value={company.credit} name="credit" placeholder="Kredi miktarı" type="number"/>
                                <Checkbox toggle onChange={(e,{checked})=>this.setState({isNewPass:checked})} label='Yeni şifre oluştur'/>
                                {this.state.isNewPass &&
                                    <Input onChange={this.handlePassChange} value={this.newPass} name="new-pass" placeholder="Yeni şifre giriniz" type="number"/>

                                }
                            </Grid.Column>
                        </Grid.Row>
                        <Button color='green' inverted floated="right" onClick={this.saveCompany}>
                        <Icon name='checkmark' /> Değişiklikleri kaydet
                        </Button>
                    </Segment>
                </Grid>
            </Modal.Description>
            </Modal.Content>
        </Modal>
        )
    }
}

EditCompanyModal.propTypes = {
    refreshCompanyTable:PropTypes.func.isRequired,
    company:PropTypes.any.isRequired,
}

export default EditCompanyModal
import React from 'react';
import { Grid,Header,Button,Form,Segment,Transition } from 'semantic-ui-react';
import {withRouter } from 'react-router-dom';
import Authorization from '../../../helpers/Authorization';
import {withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            redirectToReferrer: false,
            from:"/",
            user:{
                email:"",
                password:""
            }
        }

        this.handleTextChange=this.handleTextChange.bind(this);
        this.login=this.login.bind(this);
        this.redirect=this.redirect.bind(this);
    }

    componentDidMount(){
        if(this.props.location.state&&this.props.location.state.from){
            this.setState({visible:true,from:this.props.location.state.from.pathname});
        }
        else{
            this.setState({visible:true,from:"/"});
        }
    }
    
    login(){
        const { toastManager } = this.props;

        Authorization.login(this.state.user.email,this.state.user.password).then(result=>{
            if(!result.ok){
                toastManager.add('Hatalı kullanıcı adı veya şifre', { appearance: 'error' ,autoDismiss: true,autoDismissTimeout:3000});
            }
            else{
                result.json().then(data=>{
                    this.props.setJWT(data,this.redirect);
                    this.redirect();
                })
            }
        })
        .catch(err=>{
            toastManager.add('Giriş yapılamadı', { appearance: 'error' ,autoDismiss: true,autoDismissTimeout:3000});
        })
    }

    redirect(){
        this.props.history.push(this.state.from);
    }

    handleTextChange(e,{name,value}){
        let {user}=this.state;
        user[name]=value;
        this.setState(user);
    }

    render(){
        return(
            <div className="login-container login-form">
                <Transition visible={this.state.visible} animation='scale' duration={500}>
                    <section className="login">
                        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h1' color='orange' textAlign='center'>
                                ENNEAGRAM
                                </Header>
                                <Form size='large'>
                                    <Segment>
                                        <Form.Input name="email" fluid icon='user' onChange={this.handleTextChange} autoComplete="on" iconPosition='left' placeholder='E-mail' />
                                        <Form.Input name="password" fluid icon='lock' onChange={this.handleTextChange} autoComplete="on" iconPosition='left' placeholder='Şifre' type='password' />

                                        <Button color='orange' fluid size='large' onClick={this.login}>Giriş yapın</Button>
                                    </Segment>
                                    </Form>
                            </Grid.Column>
                        </Grid>
                    </section>
                </Transition>
            </div>

        )
    }
}


Login.propTypes = {
    setJWT:PropTypes.any.isRequired,
}
export default withToastManager(withRouter(Login));
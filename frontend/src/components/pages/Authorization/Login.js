import React from 'react';
import { Grid,Header,Button,Form,Segment,Transition,Loader } from 'semantic-ui-react';
import {withRouter } from 'react-router-dom';
import Authorization from '../../../helpers/Authorization';
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import urls from '../../../helpers/URLs';

const errorTypes={
    ServerUnreachable:"Failed to fetch"
}

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            redirectToReferrer: false,
            from:null,
            user:{
                mail:"",
                password:""
            },
            isLoading:false
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
            this.setState({visible:true});
        }
    }
    
    login(){
        this.setState({isLoading:true});
        Authorization.login(this.state.user.mail,this.state.user.password).then(result=>{
            if(!result.ok){
                toast.error('Hatalı kullanıcı adı veya şifre',{position: toast.POSITION.TOP_CENTER});
                this.setState({isLoading:false});
            }
            else{
                result.json().then(answer=>{
                    this.props.saveUserToLocalStore(answer.user,this.redirect);
                }).catch((err)=>{
                    this.setState({isLoading:false});
                });
            }
        })
        .catch(err=>{
            if(err.message===errorTypes.ServerUnreachable){
                toast.error('Giriş yapılamadı. Sisteme ulaşılamıyor.',{position: toast.POSITION.TOP_CENTER});
            }
            else{
                toast.error('Giriş yapılamadı.',{position: toast.POSITION.TOP_CENTER});
            }
            this.setState({isLoading:false});
        });
    }

    redirect(userRole){
        if(this.state.from)
        {
            if(userRole==="company")
            {
                this.props.history.push(urls.customerPanel());
            }
            else if(userRole==="admin")
            {
                this.props.history.push(urls.adminPanel());
            }
            else if(userRole==="employee")
            {
                this.props.history.push(urls.test);
            }
        }
        else{
            switch (userRole) {
                case "admin":
                    this.props.history.push(urls.adminPanel());
                    break;
                case "company":
                    this.props.history.push(urls.customerPanel());
                break;
                case "employee":
                    this.props.history.push(urls.test);
                break;
                default:
                    this.props.history.push(urls.homepage);
                    break;
            }
        }

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
                                TRİA AKADEMİ
                                </Header>
                                <Form size='large'>
                                    <Segment>
                                        <Form.Input name="mail" fluid icon='user' onChange={this.handleTextChange} autoComplete="on" iconPosition='left' placeholder='E-mail' />
                                        <Form.Input name="password" fluid icon='lock' onChange={this.handleTextChange} autoComplete="on" iconPosition='left' placeholder='Şifre' type='password' />
                                            {this.state.isLoading?
                                            (
                                                <Button color='orange' fluid size='large' onClick={this.login} disabled>
                                                    <Loader active inline inverted size='small'/>
                                                </Button>
                                            )
                                            :(
                                                <Button color='orange' fluid size='large' onClick={this.login}>
                                                    <span>Giriş yapın</span>
                                                </Button>
                                            )
                                            }
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
    saveUserToLocalStore:PropTypes.any.isRequired,
}
export default withRouter(Login);
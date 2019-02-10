import React from 'react';
import { Grid,Header,Button,Form,Message,Segment } from 'semantic-ui-react';
import PulseButton from '../../common/PulseButton';
import {Redirect,withRouter } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            redirectToReferrer: false
        }
    }

    componentDidMount(){
        this.setState({visible:true});
    }

    render(){
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        
        return(
            // <div className="login-container flex-center">
            //     <section className="login flex-center">
            //         <Transition visible={this.state.visible} animation='scale' duration={500}>
            //             <Container className="centered" text>
            //                 <Segment textAlign='center' size='big' >
            //                     <Header as='h1'>Giriş yapın</Header>     
            //                     <PulseButton positive url={"/"}>Giriş yapın</PulseButton>
            //                 </Segment>
            //             </Container>
            //         </Transition>
            //     </section>
            // </div>

            <div className="login-container login-form">
                <section className="login">
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='orange' textAlign='center'>
                        Giriş yapın
                        </Header>
                        <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            />

                            <Button color='orange' fluid size='large'>
                            Login
                            </Button>
                        </Segment>
                        </Form>
                    </Grid.Column>
                    </Grid>
                </section>
            </div>

        )
    }
}


export default withRouter(Login);
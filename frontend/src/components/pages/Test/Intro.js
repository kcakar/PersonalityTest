import React from 'react';
import PropTypes from 'prop-types';
import { Container,Header,Transition,Segment,Image,Button,Loader } from 'semantic-ui-react';
import PulseButton from '../../common/PulseButton';
import logo from '../../../assets/enneagram.svg';


class Intro extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
        }
    }

    componentDidMount(){
        this.setState({visible:true});
    }

    render(){
        return(
            <div className="intro-container flex-center">
                <section className="intro flex-center">
                    <Transition visible={this.state.visible} animation='scale' duration={500}>
                        <Container className="centered" text>
                            <Segment textAlign='center' size='big' >
                                <Image src={logo} size='medium' circular />  
                                <Header as='h1'>Tria Akademi</Header>     
                                <ul>
                                    <li>Kişilik testi yaklaşık 25 dakika sürecektir.</li>
                                    <li>Teste daha sonra kaldığınız yerden devam edebilirsiniz.</li>
                                </ul>
                                {this.props.isLoaded?
                                <PulseButton positive onClick={this.props.testStart}>Teste başlayın</PulseButton>
                                :
                                (<Button color='orange' fluid size='large' onClick={this.login} disabled>
                                    <Loader active inline inverted size='small'/>
                                </Button>)
                                }
                            </Segment>
                        </Container>
                    </Transition>
                </section>
            </div>
        )
    }
}

Intro.propTypes = {
    testStart:PropTypes.any.isRequired,
    isLoaded:PropTypes.any.isRequired,
}

export default Intro;